from django.contrib import admin
from .models import (
    State, City, Amenity, OccasionTag,
    Hotel, HotelImage, VerifiedPhoto,
    BlogPost, NewsletterSubscriber, HotelSubmission
)


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'code']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name', 'state', 'is_active', 'created_at']
    list_filter = ['state', 'is_active']
    search_fields = ['name', 'state__name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(OccasionTag)
class OccasionTagAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'city', 'price_from', 'guest_rating',
        'is_jacuzzi_verified', 'is_featured', 'is_active'
    ]
    list_filter = [
        'is_jacuzzi_verified', 'is_featured', 'is_active',
        'city__state', 'amenities', 'occasions'
    ]
    search_fields = ['name', 'address', 'primary_keyword']
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ['amenities', 'occasions']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'city', 'address', 'zip_code')
        }),
        ('Location Coordinates', {
            'fields': ('latitude', 'longitude'),
            'classes': ('collapse',)
        }),
        ('Contact', {
            'fields': ('phone', 'website'),
            'classes': ('collapse',)
        }),
        ('Jacuzzi Verification', {
            'fields': ('is_jacuzzi_verified', 'verification_date', 'verification_notes')
        }),
        ('Amenities & Occasions', {
            'fields': ('amenities', 'occasions')
        }),
        ('Pricing', {
            'fields': ('price_from', 'currency', 'price_last_updated')
        }),
        ('Ratings', {
            'fields': ('guest_rating', 'review_count')
        }),
        ('Affiliate Links', {
            'fields': ('booking_com_link', 'expedia_link', 'direct_link'),
            'description': 'Links to booking partners with affiliate tracking'
        }),
        ('SEO', {
            'fields': ('seo_title', 'seo_description', 'primary_keyword', 'secondary_keywords'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('is_featured', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(HotelImage)
class HotelImageAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'is_hero', 'shows_jacuzzi', 'order', 'created_at']
    list_filter = ['is_hero', 'shows_jacuzzi']
    search_fields = ['hotel__name', 'caption']


@admin.register(VerifiedPhoto)
class VerifiedPhotoAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'photo_type', 'caption', 'created_at']
    list_filter = ['photo_type']
    search_fields = ['hotel__name', 'caption']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'category', 'is_published', 'published_at',
        'author', 'view_count', 'reading_time'
    ]
    list_filter = ['category', 'is_published', 'schema_type']
    search_fields = ['title', 'content', 'primary_keyword']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    filter_horizontal = ['related_hotels', 'related_states']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'author', 'excerpt', 'content')
        }),
        ('Categorization', {
            'fields': ('category', 'tags')
        }),
        ('SEO', {
            'fields': ('primary_keyword', 'secondary_keywords', 'seo_title', 'seo_description')
        }),
        ('Media', {
            'fields': ('featured_image', 'featured_image_alt')
        }),
        ('Related Content', {
            'fields': ('related_hotels', 'related_states')
        }),
        ('Publishing', {
            'fields': ('is_published', 'published_at', 'reading_time')
        }),
        ('Schema', {
            'fields': ('schema_type', 'faq_data'),
            'classes': ('collapse',)
        }),
        ('Stats', {
            'fields': ('view_count',),
            'classes': ('collapse',)
        }),
    )


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'interests', 'is_confirmed', 'subscribed_at']
    list_filter = ['is_confirmed']
    search_fields = ['email', 'first_name', 'interests']
    readonly_fields = ['subscribed_at', 'unsubscribed_at']


@admin.register(HotelSubmission)
class HotelSubmissionAdmin(admin.ModelAdmin):
    list_display = [
        'hotel_name', 'hotel_city', 'hotel_state',
        'jacuzzi_type', 'status', 'submitter_email', 'created_at'
    ]
    list_filter = ['status', 'jacuzzi_type', 'hotel_state']
    search_fields = ['hotel_name', 'submitter_name', 'submitter_email']
    readonly_fields = ['created_at', 'reviewed_at', 'reviewed_by']
    
    fieldsets = (
        ('Submitter Information', {
            'fields': ('submitter_name', 'submitter_email')
        }),
        ('Hotel Details', {
            'fields': (
                'hotel_name', 'hotel_address', 'hotel_city',
                'hotel_state', 'hotel_zip', 'hotel_website', 'hotel_phone'
            )
        }),
        ('Jacuzzi Information', {
            'fields': ('jacuzzi_type', 'jacuzzi_description', 'has_photos')
        }),
        ('Additional Info', {
            'fields': ('price_range', 'occasion_visited', 'additional_notes')
        }),
        ('Admin Review', {
            'fields': ('status', 'admin_notes', 'reviewed_by', 'reviewed_at', 'created_at')
        }),
    )
