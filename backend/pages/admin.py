from django.contrib import admin
from .models import ContentPage

@admin.register(ContentPage)
class ContentPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
