from django.contrib import admin
from .models import Post, Category, Tag, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'published_at')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Comment)
