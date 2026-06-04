from rest_framework import generics
from .models import ContentPage
from .serializers import ContentPageSerializer

class ContentPageDetail(generics.RetrieveAPIView):
    queryset = ContentPage.objects.filter(is_published=True)
    serializer_class = ContentPageSerializer
    lookup_field = 'slug'
