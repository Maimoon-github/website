"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from app.core.views import AboutProfileViewSet, SkillViewSet, ExperienceViewSet, EducationViewSet
from app.projects.views import ProjectViewSet, ProjectCategoryViewSet
from app.blog.views import PostViewSet, CategoryViewSet, TagViewSet
from app.knowledge.views import DomainViewSet, LearningPathViewSet, EcosystemToolViewSet
from app.contact.views import ContactViewSet

router = DefaultRouter()
# Core
router.register(r'about', AboutProfileViewSet, basename='about')
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'education', EducationViewSet)
# Projects
router.register(r'projects', ProjectViewSet)
router.register(r'project-categories', ProjectCategoryViewSet)
# Blog
router.register(r'posts', PostViewSet)
router.register(r'blog-categories', CategoryViewSet)
router.register(r'tags', TagViewSet)
# Knowledge
router.register(r'domains', DomainViewSet)
router.register(r'learning-paths', LearningPathViewSet)
router.register(r'tools', EcosystemToolViewSet)
# Contact
router.register(r'contact', ContactViewSet, basename='contact')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

