from rest_framework import generics
from .models import ContactInfo, ContactMessage
from .serializers import ContactInfoSerializer, ContactMessageSerializer

class ContactInfoDetail(generics.ListAPIView):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer

class ContactMessageCreate(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
