from rest_framework import generics
from .models import HeroSection
from .serializers import HeroSectionSerializer

class HeroSectionDetail(generics.ListAPIView):
    queryset = HeroSection.objects.filter(is_active=True)
    serializer_class = HeroSectionSerializer
