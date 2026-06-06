from django.contrib import admin
from .models import Project, ProjectCategory, ProjectScreenshot

class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectScreenshotInline]

admin.site.register(ProjectCategory)
