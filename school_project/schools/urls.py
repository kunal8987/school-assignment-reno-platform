from django.urls import path
from .views import SchoolCreate, SchoolList

urlpatterns = [
    path('schools/create/', SchoolCreate.as_view(), name='school-create'),
    path('schools/', SchoolList.as_view(), name='school-list'),
]
