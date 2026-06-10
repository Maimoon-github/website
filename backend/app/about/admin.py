from django.contrib import admin
from .models import AboutProfile, Skill, Experience, Education


admin.site.register(AboutProfile)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'focus_area', 'level')
    list_filter = ('category', 'focus_area')
    search_fields = ('name',)


admin.site.register(Experience)
admin.site.register(Education)