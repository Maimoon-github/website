from rest_framework import viewsets
from .models import HeroContent, StatCounter
from .serializers import HeroContentSerializer, StatCounterSerializer

class HeroContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroContent.objects.filter(is_active=True)
    serializer_class = HeroContentSerializer

class StatCounterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StatCounter.objects.all()
    serializer_class = StatCounterSerializer
