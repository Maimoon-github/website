from rest_framework import viewsets
from .models import Project, ProjectCategory
from .serializers import ProjectSerializer, ProjectCategorySerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured')
        category = self.request.query_params.get('category')
        
        if featured is not None:
            queryset = queryset.filter(is_featured=featured.lower() == 'true')
        if category:
            queryset = queryset.filter(category__slug=category)
        return queryset

class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    lookup_field = 'slug'
