from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'published_at')
    list_filter = ('status', 'published_at', 'author')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content')
