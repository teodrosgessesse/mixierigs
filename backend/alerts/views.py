from rest_framework.decorators import api_view
from rest_framework.response import Response
from mixierigs_api.db import get_db

@api_view(['GET'])
def list_alerts(request):
    try:
        db     = get_db()
        alerts = list(db.alerts.find())
        for a in alerts:
            a['id'] = str(a.pop('_id'))
        return Response({'alerts': alerts})
    except Exception as e:
        from mixierigs_api.seed_data import SEED_ALERTS
        alerts = [{**a, 'id': a['_id']} for a in SEED_ALERTS]
        return Response({'alerts': alerts, 'source': 'fallback'})

@api_view(['POST'])
def acknowledge_alert(request, alert_id):
    try:
        db = get_db()
        db.alerts.update_one(
            {'_id': alert_id},
            {'$set': {
                'acknowledged': True,
                'ackBy':   request.data.get('ackBy', 'Operator'),
                'ackTime': __import__('datetime').datetime.utcnow().isoformat(),
            }}
        )
        return Response({'success': True})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
