from django.urls import path
from .views import *

app_name = 'backend'

urlpatterns = [
    path('tasks_list/', tasks_list),
    path('task_detail/', task_detail),
    path('code_complete/', code_complete),
]
