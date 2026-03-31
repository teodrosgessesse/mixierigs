from rest_framework.decorators import api_view
from rest_framework.response import Response
from mixierigs_api.db import get_db
from bson import json_util
import json

@api_view(['GET'])
def list_rigs(request):
    try:
        db   = get_db()
        rigs = list(db.rigs.find({}, {'_id': 1, 'name': 1, 'type': 1, 'area': 1,
                                      'status': 1, 'alarms': 1, 'depth': 1,
                                      'dot': 1, 'customer': 1}))
        for r in rigs:
            r['id'] = r.pop('_id')
        return Response({'rigs': rigs})
    except Exception as e:
        from mixierigs_api.seed_data import SEED_RIGS
        rigs = [{**r, 'id': r['_id']} for r in SEED_RIGS]
        return Response({'rigs': rigs, 'source': 'fallback'})

@api_view(['GET'])
def get_rig(request, rig_id):
    try:
        db  = get_db()
        rig = db.rigs.find_one({'_id': rig_id})
        if not rig:
            return Response({'error': 'Rig not found'}, status=404)
        rig['id'] = rig.pop('_id')
        return Response({'rig': rig})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['PATCH'])
def update_rig_status(request, rig_id):
    try:
        db = get_db()
        db.rigs.update_one({'_id': rig_id}, {'$set': request.data})
        return Response({'success': True})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
