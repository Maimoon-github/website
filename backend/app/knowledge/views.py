from rest_framework import viewsets
from .models import Domain, LearningPath, EcosystemTool
from .serializers import DomainListSerializer, DomainDetailSerializer, LearningPathSerializer, EcosystemToolSerializer

class DomainViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Domain.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DomainDetailSerializer
        return DomainListSerializer

class LearningPathViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer

class EcosystemToolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EcosystemTool.objects.all()
    serializer_class = EcosystemToolSerializer
