from django.contrib import admin
from .models import HeroSection, BioSection, JourneyPhase


@admin.register(BioSection)
class BioSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'is_active')


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    list_filter = ('is_active',)



@admin.register(JourneyPhase)
class JourneyPhaseAdmin(admin.ModelAdmin):
    list_display = ('phase_number', 'title', 'subtitle')
    ordering = ('phase_number',)
