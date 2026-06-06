from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectCategoryViewSet

router = DefaultRouter()
router.register(r'list', ProjectViewSet)
router.register(r'categories', ProjectCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
