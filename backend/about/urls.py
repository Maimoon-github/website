from django.urls import path
from .views import AboutPageView, AboutSectionDetail, TeamMemberList

urlpatterns = [
    path('', AboutPageView.as_view(), name='about-page'),
    path('section/', AboutSectionDetail.as_view(), name='about-section'),
    path('team/', TeamMemberList.as_view(), name='team-list'),
]
