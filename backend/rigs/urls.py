from django.urls import path
from . import views

urlpatterns = [
    path('',          views.list_rigs,         name='list_rigs'),
    path('<str:rig_id>/', views.get_rig,       name='get_rig'),
    path('<str:rig_id>/status/', views.update_rig_status, name='update_rig_status'),
]
