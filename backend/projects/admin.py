from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client_name', 'is_featured', 'completion_date')
    list_filter = ('is_featured', 'completion_date')
    prepopulated_fields = {'slug': ('title',)}
