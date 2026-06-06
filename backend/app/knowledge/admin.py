from django.contrib import admin
from .models import Domain, LearningPath, EcosystemTool

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'slug')
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(LearningPath)
admin.site.register(EcosystemTool)
