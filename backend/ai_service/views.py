import os, json
import urllib.request
import urllib.error
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

@api_view(['POST'])
def chat(request):
    """Proxy to Anthropic API with rig context injection."""
    try:
        messages       = request.data.get('messages', [])
        system_context = request.data.get('systemContext', '')
        rig_id         = request.data.get('rigId')

        # Enrich context with live MongoDB data if rig specified
        if rig_id:
            try:
                from mixierigs_api.db import get_db
                db  = get_db()
                rig = db.rigs.find_one({'_id': rig_id})
                if rig:
                    system_context += f"\n\nLive rig data from MongoDB: {json.dumps({k:v for k,v in rig.items() if k != '_id'})}"
            except Exception:
                pass

        payload = json.dumps({
            'model':      'claude-sonnet-4-6',
            'max_tokens': 1024,
            'system':     system_context or 'You are MixieAI, an Oil & Gas operations assistant.',
            'messages':   messages,
        }).encode()

        req = urllib.request.Request(
            'https://api.anthropic.com/v1/messages',
            data=payload,
            headers={
                'Content-Type':      'application/json',
                'x-api-key':         settings.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            method='POST'
        )

        with urllib.request.urlopen(req, timeout=30) as resp:
            data    = json.loads(resp.read())
            content = data.get('content', [{}])[0].get('text', '')
            return Response({'content': content})

    except urllib.error.HTTPError as e:
        return Response({'error': f'AI API error: {e.code}'}, status=500)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def analyze_situation(request):
    """Structured situation analysis for a rig's current state."""
    rig_id = request.data.get('rigId')
    if not rig_id:
        return Response({'error': 'rigId required'}, status=400)

    try:
        from mixierigs_api.db import get_db
        db     = get_db()
        rig    = db.rigs.find_one({'_id': rig_id}) or {}
        alerts = list(db.alerts.find({'rigId': rig_id, 'acknowledged': False}))
    except Exception:
        rig, alerts = {}, []

    prompt = f"""Analyze this oil & gas rig situation and respond in JSON only:

Rig: {json.dumps(rig)}
Active Alerts: {json.dumps(alerts)}

Return JSON with keys:
- situation_summary (string, ≤2 sentences)
- severity (critical|warning|normal)
- probable_cause (string)
- recommended_actions (array of strings, max 4)
- confidence (high|medium|low)
"""

    try:
        payload = json.dumps({
            'model': 'claude-sonnet-4-6', 'max_tokens': 512,
            'messages': [{'role': 'user', 'content': prompt}],
        }).encode()

        req = urllib.request.Request(
            'https://api.anthropic.com/v1/messages', data=payload,
            headers={'Content-Type': 'application/json',
                     'x-api-key': settings.ANTHROPIC_API_KEY,
                     'anthropic-version': '2023-06-01'},
            method='POST'
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
            text = data['content'][0]['text'].strip()
            # Strip markdown code fences if present
            if text.startswith('```'):
                text = text.split('\n', 1)[1].rsplit('```', 1)[0]
            return Response({'analysis': json.loads(text)})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
