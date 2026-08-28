from django.db import models
from django.contrib.auth.models import User


class State(models.Model):
    """US State model for location hierarchy"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    code = models.CharField(max_length=2, unique=True)  # e.g., "TN", "CA"
    description = models.TextField(blank=True)
    featured_image = models.ImageField(upload_to='states/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "States"

    def __str__(self):
        return self.name


class City(models.Model):
    """City model linked to states"""
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')
    name = models.CharField(max_length=100)
    slug = models.SlugField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        unique_together = ['state', 'slug']

    def __str__(self):
        return f"{self.name}, {self.state.code}"


class Amenity(models.Model):
    """Amenity tags for hotels (fireplace, ocean view, pet-friendly, etc.)"""
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    category = models.CharField(
        max_length=20,
        choices=[
            ('room', 'Room Features'),
            ('view', 'Views'),
            ('service', 'Services'),
            ('accessibility', 'Accessibility'),
        ],
        default='room'
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class OccasionTag(models.Model):
    """Occasion tags for hotels (romantic, honeymoon, anniversary, etc.)"""
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#4A6FA5', help_text="Hex color code")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Hotel(models.Model):
    """Main hotel listing with in-room jacuzzi verification"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    
    # Location
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='hotels')
    address = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Contact & Links
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    
    # Jacuzzi Verification
    is_jacuzzi_verified = models.BooleanField(default=False, help_text="Confirmed in-room jacuzzi/hot tub")
    verification_date = models.DateField(null=True, blank=True)
    verification_notes = models.TextField(blank=True, help_text="Details about jacuzzi type, location in room, etc.")
    
    # Amenities & Occasions
    amenities = models.ManyToManyField(Amenity, related_name='hotels', blank=True)
    occasions = models.ManyToManyField(OccasionTag, related_name='hotels', blank=True)
    
    # Pricing
    price_from = models.DecimalField(max_digits=8, decimal_places=2, help_text="Starting price per night")
    currency = models.CharField(max_length=3, default='USD')
    price_last_updated = models.DateTimeField(null=True, blank=True)
    
    # Ratings
    guest_rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True, help_text="Average guest rating (0-5)")
    review_count = models.PositiveIntegerField(default=0)
    
    # Affiliate Links
    booking_com_link = models.URLField(blank=True, help_text="Booking.com affiliate link")
    expedia_link = models.URLField(blank=True, help_text="Expedia affiliate link")
    direct_link = models.URLField(blank=True, help_text="Direct hotel booking link")
    
    # SEO
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    primary_keyword = models.CharField(max_length=100, blank=True)
    secondary_keywords = models.TextField(blank=True, help_text="Comma-separated keywords")
    
    # Status
    is_featured = models.BooleanField(default=False, help_text="Show in featured listings")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-guest_rating', 'name']
        indexes = [
            models.Index(fields=['is_featured', '-guest_rating']),
            models.Index(fields=['city', 'is_active']),
        ]

    def __str__(self):
        return self.name

    def get_full_location(self):
        return f"{self.city.name}, {self.city.state.code}"


class HotelImage(models.Model):
    """Images for hotel listings"""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hotels/')
    caption = models.CharField(max_length=200, blank=True)
    is_hero = models.BooleanField(default=False, help_text="Use as primary/hero image")
    shows_jacuzzi = models.BooleanField(default=False, help_text="Image clearly shows in-room jacuzzi")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-is_hero']

    def __str__(self):
        return f"Image for {self.hotel.name}"


class VerifiedPhoto(models.Model):
    """Verification photos showing jacuzzi details"""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='verification_photos')
    photo = models.ImageField(upload_to='verifications/')
    photo_type = models.CharField(
        max_length=20,
        choices=[
            ('jacuzzi_closeup', 'Jacuzzi Close-up'),
            ('room_context', 'Jacuzzi in Room Context'),
            ('bathroom_overall', 'Overall Bathroom'),
            ('amenity_detail', 'Amenity Detail'),
        ]
    )
    caption = models.CharField(max_length=200)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Verification photo for {self.hotel.name}"


class BlogPost(models.Model):
    """Blog posts for content marketing and SEO"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='hotel_blog_posts')
    
    # Content
    excerpt = models.TextField(help_text="Short summary for listings")
    content = models.TextField(help_text="Full blog post content (HTML/Markdown)")
    
    # Categorization
    category = models.CharField(
        max_length=50,
        choices=[
            ('destination', 'Destination Guide'),
            ('occasion', 'Occasion-Based'),
            ('amenity', 'Amenity Focus'),
            ('brand', 'Hotel Brand'),
            ('budget', 'Budget/Luxury'),
            ('tips', 'Travel Tips'),
        ],
        default='destination'
    )
    tags = models.TextField(blank=True, help_text="Comma-separated tags")
    
    # SEO
    primary_keyword = models.CharField(max_length=100)
    secondary_keywords = models.TextField(blank=True, help_text="Comma-separated keywords")
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)
    
    # Media
    featured_image = models.ImageField(upload_to='blog/', null=True, blank=True)
    featured_image_alt = models.CharField(max_length=200, blank=True)
    
    # Related Content
    related_hotels = models.ManyToManyField(Hotel, related_name='related_blog_posts', blank=True)
    related_states = models.ManyToManyField(State, related_name='related_blog_posts', blank=True)
    
    # Publishing
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    reading_time = models.CharField(max_length=20, default='5 min read')
    view_count = models.PositiveIntegerField(default=0)
    
    # Schema
    schema_type = models.CharField(
        max_length=20,
        choices=[('Article', 'Article'), ('FAQPage', 'FAQ Page')],
        default='Article'
    )
    faq_data = models.JSONField(blank=True, null=True, help_text="FAQ schema data as JSON")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title


class NewsletterSubscriber(models.Model):
    """Email newsletter subscribers"""
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    
    # Segmentation
    interests = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated: romantic, budget, luxury, honeymoon, etc."
    )
    
    # Compliance
    is_confirmed = models.BooleanField(default=False)
    confirmation_token = models.CharField(max_length=100, blank=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.email


class HotelSubmission(models.Model):
    """User-submitted hotel recommendations"""
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('needs_info', 'Needs More Information'),
    ]
    
    submitter_name = models.CharField(max_length=100)
    submitter_email = models.EmailField()
    hotel_name = models.CharField(max_length=200)
    hotel_address = models.CharField(max_length=255)
    hotel_city = models.CharField(max_length=100)
    hotel_state = models.CharField(max_length=2)
    hotel_zip = models.CharField(max_length=10)
    hotel_website = models.URLField(blank=True)
    hotel_phone = models.CharField(max_length=20, blank=True)
    
    # Jacuzzi Details
    jacuzzi_type = models.CharField(
        max_length=50,
        choices=[
            ('in_room', 'In-Room Jacuzzi'),
            ('private_outdoor', 'Private Outdoor Hot Tub'),
            ('shared_spa', 'Shared Spa Facility'),
            ('not_sure', 'Not Sure'),
        ]
    )
    jacuzzi_description = models.TextField()
    has_photos = models.BooleanField(default=False)
    
    # Additional Info
    price_range = models.CharField(max_length=50, blank=True)
    occasion_visited = models.CharField(max_length=100, blank=True)
    additional_notes = models.TextField(blank=True)
    
    # Admin
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Submission: {self.hotel_name} ({self.status})"
