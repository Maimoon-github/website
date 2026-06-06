from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectCategoryViewSet

router = DefaultRouter()
router.register(r'list', ProjectViewSet, basename='project')
router.register(r'categories', ProjectCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
✖ 30 problems (27 errors, 3 warnings)