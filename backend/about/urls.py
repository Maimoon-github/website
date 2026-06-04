from django.urls import path
from .views import AboutSectionDetail, TeamMemberList

urlpatterns = [
    path('section/', AboutSectionDetail.as_view(), name='about-section'),
    path('team/', TeamMemberList.as_view(), name='team-list'),
]
