from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer

class ServiceList(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
