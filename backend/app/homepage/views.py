from rest_framework import viewsets
from .models import HeroContent, StatCounter, PageSection
from .serializers import HeroContentSerializer, StatCounterSerializer, PageSectionSerializer

class HeroContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroContent.objects.filter(is_active=True)
    serializer_class = HeroContentSerializer

class StatCounterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StatCounter.objects.all()
    serializer_class = StatCounterSerializer

class PageSectionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PageSectionSerializer

    def get_queryset(self):
        queryset = PageSection.objects.filter(is_active=True)
        page = self.request.query_params.get('page')
        if page:
            queryset = queryset.filter(page=page)
        return queryset
