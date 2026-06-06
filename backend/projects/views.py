from rest_framework import viewsets
from .models import Project, ProjectCategory
from .serializers import ProjectListSerializer, ProjectDetailSerializer, ProjectCategorySerializer

class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    lookup_field = 'slug'
    filterset_fields = ['category__slug', 'is_featured']
    search_fields = ['title', 'description', 'tech_stack']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
