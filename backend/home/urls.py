from django.urls import path
from .views import HeroSectionDetail

urlpatterns = [
    path('', HeroSectionDetail.as_view(), name='hero-detail'),
]
