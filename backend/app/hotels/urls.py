from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StateViewSet, CityViewSet, AmenityViewSet, OccasionTagViewSet,
    HotelViewSet, BlogPostViewSet,
    NewsletterSubscriberViewSet, HotelSubmissionViewSet
)

router = DefaultRouter()
router.register(r'states', StateViewSet, basename='state')
router.register(r'cities', CityViewSet, basename='city')
router.register(r'amenities', AmenityViewSet, basename='amenity')
router.register(r'occasions', OccasionTagViewSet, basename='occasion')
router.register(r'hotels', HotelViewSet, basename='hotel')
router.register(r'blog', BlogPostViewSet, basename='blog-post')
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')
router.register(r'submissions', HotelSubmissionViewSet, basename='submission')

urlpatterns = [
    path('', include(router.urls)),
]
