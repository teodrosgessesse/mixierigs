from django.urls import path
from . import views

urlpatterns = [
    path('',                        views.list_alerts,      name='list_alerts'),
    path('<str:alert_id>/ack/',     views.acknowledge_alert, name='ack_alert'),
]
