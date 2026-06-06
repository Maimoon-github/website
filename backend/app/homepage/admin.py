from django.contrib import admin
from .models import HeroContent, StatCounter, PageSection

@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'updated_at')

@admin.register(StatCounter)
class StatCounterAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')

@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'page', 'component_type', 'is_active', 'order')
    list_filter = ('page', 'is_active')
    search_fields = ('title', 'endpoint')
