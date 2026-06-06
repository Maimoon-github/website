from rest_framework import viewsets
from .models import Domain, LearningPath, EcosystemTool
from .serializers import DomainSerializer, LearningPathSerializer, EcosystemToolSerializer

class DomainViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    lookup_field = 'slug'

class LearningPathViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer
    lookup_field = 'slug'

class EcosystemToolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EcosystemTool.objects.all()
    serializer_class = EcosystemToolSerializer
