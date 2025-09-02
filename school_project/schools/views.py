from rest_framework import generics
from .models import School
from .serializers import SchoolSerializer

# Class to create a new school record
class SchoolCreate(generics.CreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

# Class to fetch (list) all school records
class SchoolList(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
