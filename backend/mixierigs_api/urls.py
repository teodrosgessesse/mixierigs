from django.urls import path, include

urlpatterns = [
    path('api/rigs/',    include('rigs.urls')),
    path('api/alerts/',  include('alerts.urls')),
    path('api/ai/',      include('ai_service.urls')),
    path('api/health/',  lambda r: __import__('django.http', fromlist=['JsonResponse']).JsonResponse({'status': 'ok', 'service': 'MixieRigs API'})),
]
