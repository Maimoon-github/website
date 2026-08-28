"""
Seed data for Hotel Location Finder - In-Room Jacuzzi/Hot Tub Platform
Populates states, cities, amenities, occasions, and sample hotel listings
"""

import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from app.hotels.models import (
    State, City, Amenity, OccasionTag,
    Hotel, HotelImage, BlogPost,
    NewsletterSubscriber, HotelSubmission
)


def create_superuser():
    """Create admin user for testing"""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@hotelfinder.com',
            password='admin123',
            first_name='Admin',
            last_name='User'
        )
        print("✓ Created superuser: admin / admin123")
    else:
        print("✓ Superuser already exists")


def create_amenities():
    """Create amenity tags"""
    amenities_data = [
        # Room Features
        {'name': 'Fireplace', 'slug': 'fireplace', 'icon': 'flame', 'category': 'room'},
        {'name': 'King Bed', 'slug': 'king-bed', 'icon': 'bed-double', 'category': 'room'},
        {'name': 'Balcony', 'slug': 'balcony', 'icon': 'door-open', 'category': 'room'},
        {'name': 'Kitchenette', 'slug': 'kitchenette', 'icon': 'coffee', 'category': 'room'},
        {'name': 'Smart TV', 'slug': 'smart-tv', 'icon': 'tv', 'category': 'room'},
        {'name': 'WiFi', 'slug': 'wifi', 'icon': 'wifi', 'category': 'service'},
        
        # Views
        {'name': 'Ocean View', 'slug': 'ocean-view', 'icon': 'waves', 'category': 'view'},
        {'name': 'Mountain View', 'slug': 'mountain-view', 'icon': 'mountain', 'category': 'view'},
        {'name': 'City View', 'slug': 'city-view', 'icon': 'building', 'category': 'view'},
        {'name': 'Lake View', 'slug': 'lake-view', 'icon': 'droplet', 'category': 'view'},
        
        # Services
        {'name': 'Pet Friendly', 'slug': 'pet-friendly', 'icon': 'dog', 'category': 'service'},
        {'name': 'Spa', 'slug': 'spa', 'icon': 'sparkles', 'category': 'service'},
        {'name': 'Pool', 'slug': 'pool', 'icon': 'waves', 'category': 'service'},
        {'name': 'Gym', 'slug': 'gym', 'icon': 'dumbbell', 'category': 'service'},
        {'name': 'Free Parking', 'slug': 'free-parking', 'icon': 'car', 'category': 'service'},
        {'name': 'Room Service', 'slug': 'room-service', 'icon': 'bell', 'category': 'service'},
        
        # Accessibility
        {'name': 'Wheelchair Accessible', 'slug': 'wheelchair-accessible', 'icon': 'accessibility', 'category': 'accessibility'},
        {'name': 'Elevator', 'slug': 'elevator', 'icon': 'arrow-up-down', 'category': 'accessibility'},
    ]
    
    created_count = 0
    for amenity_data in amenities_data:
        amenity, created = Amenity.objects.get_or_create(
            slug=amenity_data['slug'],
            defaults=amenity_data
        )
        if created:
            created_count += 1
    
    print(f"✓ Created {created_count} amenities ({Amenity.objects.count()} total)")


def create_occasions():
    """Create occasion tags"""
    occasions_data = [
        {'name': 'Romantic', 'slug': 'romantic', 'description': 'Perfect for romantic getaways', 'color': '#C77966'},
        {'name': 'Honeymoon', 'slug': 'honeymoon', 'description': 'Ideal for honeymoon suites', 'color': '#D4AF37'},
        {'name': 'Anniversary', 'slug': 'anniversary', 'description': 'Celebrate your special milestone', 'color': '#E91E63'},
        {'name': 'Birthday', 'slug': 'birthday', 'description': 'Make your birthday memorable', 'color': '#9C27B0'},
        {'name': 'Proposal', 'slug': 'proposal', 'description': 'Pop the question in style', 'color': '#F44336'},
        {'name': 'Girls Getaway', 'slug': 'girls-getaway', 'description': 'Fun trip with friends', 'color': '#E91E63'},
        {'name': 'Couples Retreat', 'slug': 'couples-retreat', 'description': 'Reconnect with your partner', 'color': '#673AB7'},
        {'name': 'Luxury Escape', 'slug': 'luxury-escape', 'description': 'Indulge in premium amenities', 'color': '#FFD700'},
        {'name': 'Budget Friendly', 'slug': 'budget-friendly', 'description': 'Affordable jacuzzi stays', 'color': '#4CAF50'},
    ]
    
    created_count = 0
    for occasion_data in occasions_data:
        occasion, created = OccasionTag.objects.get_or_create(
            slug=occasion_data['slug'],
            defaults=occasion_data
        )
        if created:
            created_count += 1
    
    print(f"✓ Created {created_count} occasions ({OccasionTag.objects.count()} total)")


def create_states_and_cities():
    """Create states and major cities"""
    states_data = [
        {
            'name': 'Tennessee', 'slug': 'tennessee', 'code': 'TN',
            'description': 'Home to Gatlinburg and Pigeon Forge, the heart of Smoky Mountain romance',
            'cities': [
                {'name': 'Gatlinburg', 'slug': 'gatlinburg', 'description': 'Mountain resort town with cabin rentals and jacuzzi suites'},
                {'name': 'Pigeon Forge', 'slug': 'pigeon-forge', 'description': 'Family-friendly destination with romantic accommodations'},
                {'name': 'Nashville', 'slug': 'nashville', 'description': 'Music City with luxury hotels and boutique stays'},
                {'name': 'Memphis', 'slug': 'memphis', 'description': 'Blues, BBQ, and riverside hotels'},
                {'name': 'Chattanooga', 'slug': 'chattanooga', 'description': 'Scenic mountain city with cozy retreats'},
            ]
        },
        {
            'name': 'Florida', 'slug': 'florida', 'code': 'FL',
            'description': 'Sunshine state with beachfront resorts and theme park hotels',
            'cities': [
                {'name': 'Miami', 'slug': 'miami', 'description': 'Art Deco beaches and luxury oceanfront suites'},
                {'name': 'Orlando', 'slug': 'orlando', 'description': 'Theme park capital with family jacuzzi hotels'},
                {'name': 'Key West', 'slug': 'key-west', 'description': 'Tropical paradise with intimate boutiques'},
                {'name': 'Tampa', 'slug': 'tampa', 'description': 'Gulf coast city with waterfront stays'},
                {'name': 'Fort Lauderdale', 'slug': 'fort-lauderdale', 'description': 'Venice of America with canal-side hotels'},
            ]
        },
        {
            'name': 'California', 'slug': 'california', 'code': 'CA',
            'description': 'Pacific coast luxury and wine country escapes',
            'cities': [
                {'name': 'Los Angeles', 'slug': 'los-angeles', 'description': 'Hollywood glamour and celebrity spas'},
                {'name': 'San Francisco', 'slug': 'san-francisco', 'description': 'Victorian charm and bay views'},
                {'name': 'San Diego', 'slug': 'san-diego', 'description': 'Perfect weather and beachfront relaxation'},
                {'name': 'Napa', 'slug': 'napa', 'description': 'Wine country luxury with vineyard views'},
                {'name': 'Monterey', 'slug': 'monterey', 'description': 'Coastal beauty and aquarium proximity'},
            ]
        },
        {
            'name': 'Nevada', 'slug': 'nevada', 'code': 'NV',
            'description': 'Desert entertainment and wedding chapels',
            'cities': [
                {'name': 'Las Vegas', 'slug': 'las-vegas', 'description': 'Entertainment capital with themed suites'},
                {'name': 'Reno', 'slug': 'reno', 'description': 'Biggest little city with casino resorts'},
                {'name': 'Lake Tahoe', 'slug': 'lake-tahoe', 'description': 'Alpine lake with year-round activities'},
            ]
        },
        {
            'name': 'New York', 'slug': 'new-york', 'code': 'NY',
            'description': 'Urban sophistication and Hudson Valley escapes',
            'cities': [
                {'name': 'New York City', 'slug': 'new-york-city', 'description': 'Manhattan luxury and Brooklyn boutiques'},
                {'name': 'Niagara Falls', 'slug': 'niagara-falls', 'description': 'Waterfall views and honeymoon packages'},
                {'name': 'Albany', 'slug': 'albany', 'description': 'Capital region historic stays'},
            ]
        },
        {
            'name': 'Colorado', 'slug': 'colorado', 'code': 'CO',
            'description': 'Rocky Mountain adventures and ski resort romance',
            'cities': [
                {'name': 'Denver', 'slug': 'denver', 'description': 'Mile-high city with urban spas'},
                {'name': 'Aspen', 'slug': 'aspen', 'description': 'Luxury ski resort town'},
                {'name': 'Boulder', 'slug': 'boulder', 'description': 'Outdoor recreation and wellness retreats'},
                {'name': 'Colorado Springs', 'slug': 'colorado-springs', 'description': 'Garden of the Gods backdrop'},
            ]
        },
    ]
    
    created_states = 0
    created_cities = 0
    
    for state_data in states_data:
        cities = state_data.pop('cities')
        state, state_created = State.objects.get_or_create(
            slug=state_data['slug'],
            defaults=state_data
        )
        if state_created:
            created_states += 1
        
        for city_data in cities:
            city, city_created = City.objects.get_or_create(
                state=state,
                slug=city_data['slug'],
                defaults={**city_data}
            )
            if city_created:
                created_cities += 1
    
    print(f"✓ Created {created_states} states ({State.objects.count()} total)")
    print(f"✓ Created {created_cities} cities ({City.objects.count()} total)")


def create_sample_hotels():
    """Create sample hotel listings"""
    # Get references
    tn = State.objects.get(slug='tennessee')
    fl = State.objects.get(slug='florida')
    nv = State.objects.get(slug='nevada')
    ca = State.objects.get(slug='california')
    
    gatlinburg = City.objects.get(state=tn, slug='gatlinburg')
    pigeon_forge = City.objects.get(state=tn, slug='pigeon-forge')
    miami = City.objects.get(state=fl, slug='miami')
    orlando = City.objects.get(state=fl, slug='orlando')
    las_vegas = City.objects.get(state=nv, slug='las-vegas')
    napavalley = City.objects.get(state=ca, slug='napa')
    
    romantic = OccasionTag.objects.get(slug='romantic')
    honeymoon = OccasionTag.objects.get(slug='honeymoon')
    luxury = OccasionTag.objects.get(slug='luxury-escape')
    budget = OccasionTag.objects.get(slug='budget-friendly')
    anniversary = OccasionTag.objects.get(slug='anniversary')
    proposal = OccasionTag.objects.get(slug='proposal')
    
    fireplace = Amenity.objects.get(slug='fireplace')
    king_bed = Amenity.objects.get(slug='king-bed')
    wifi = Amenity.objects.get(slug='wifi')
    ocean_view = Amenity.objects.get(slug='ocean-view')
    mountain_view = Amenity.objects.get(slug='mountain-view')
    pool = Amenity.objects.get(slug='pool')
    spa = Amenity.objects.get(slug='spa')
    city_view = Amenity.objects.get(slug='city-view')
    
    hotels_data = [
        {
            'name': 'The Lodge at Buckberry Creek',
            'slug': 'lodge-buckberry-creek-gatlinburg',
            'city': gatlinburg,
            'address': '822 Buckberry Creek Way',
            'zip_code': '37738',
            'latitude': '35.7143',
            'longitude': '-83.5102',
            'phone': '(865) 436-6666',
            'website': 'https://buckberrycreek.com',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Verified in-room jetted tubs in select suites with mountain views',
            'price_from': '249.00',
            'guest_rating': '4.6',
            'review_count': 1247,
            'is_featured': True,
            'occasions': [romantic, honeymoon, luxury],
            'amenities': [fireplace, king_bed, wifi, mountain_view, pool],
            'seo_title': 'Luxury Cabins with Jacuzzi in Gatlinburg | Buckberry Creek',
            'seo_description': 'Hand-verified in-room jacuzzi suites in Gatlinburg. Perfect for romantic getaways and honeymoons in the Smoky Mountains.',
            'primary_keyword': 'gatlinburg hotels with jacuzzi in room',
        },
        {
            'name': 'Westgate Smoky Mountain Resort',
            'slug': 'westgate-smoky-mountain-resort',
            'city': gatlinburg,
            'address': '1160 Ski Mountain Rd',
            'zip_code': '37738',
            'latitude': '35.7281',
            'longitude': '-83.5543',
            'phone': '(865) 430-2000',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Multiple suite types with private in-room whirlpool tubs verified',
            'price_from': '189.00',
            'guest_rating': '4.4',
            'review_count': 3521,
            'is_featured': True,
            'occasions': [romantic],
            'amenities': [fireplace, king_bed, wifi, mountain_view, pool],
            'seo_title': 'Smoky Mountain Resort with In-Room Jacuzzi | Westgate',
            'seo_description': 'Verified jacuzzi suites in Gatlinburg. Family-friendly resort with romantic options near Great Smoky Mountains National Park.',
            'primary_keyword': 'smoky mountain resort with jacuzzi',
        },
        {
            'name': 'The Ritz-Carlton Orlando',
            'slug': 'ritz-carlton-orlando',
            'city': orlando,
            'address': '4012 Central Florida Pkwy',
            'zip_code': '32837',
            'latitude': '28.3772',
            'longitude': '-81.5707',
            'phone': '(407) 393-4000',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Club level suites feature deep soaking tubs with jets',
            'price_from': '329.00',
            'guest_rating': '4.7',
            'review_count': 2156,
            'is_featured': True,
            'occasions': [luxury, honeymoon],
            'amenities': [king_bed, wifi, pool, spa],
            'seo_title': 'Luxury Orlando Hotel with Jacuzzi Suites | Ritz-Carlton',
            'seo_description': 'Five-star Orlando resort with verified in-room jacuzzis. Perfect for theme park visits with luxury amenities.',
            'primary_keyword': 'orlando luxury hotels with jacuzzi',
        },
        {
            'name': 'Fontainebleau Miami Beach',
            'slug': 'fontainebleau-miami-beach',
            'city': miami,
            'address': '4441 Collins Ave',
            'zip_code': '33140',
            'latitude': '25.8209',
            'longitude': '-80.1217',
            'phone': '(305) 538-2000',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Oceanfront suites with private whirlpool tubs on balconies',
            'price_from': '449.00',
            'guest_rating': '4.5',
            'review_count': 8934,
            'is_featured': True,
            'occasions': [romantic, luxury, anniversary],
            'amenities': [king_bed, wifi, ocean_view, pool, spa],
            'seo_title': 'Miami Beach Oceanfront Hotel with Jacuzzi | Fontainebleau',
            'seo_description': 'Iconic Miami Beach resort with verified oceanview jacuzzi suites. Luxury amenities and world-class dining.',
            'primary_keyword': 'miami beach hotels with jacuzzi in room',
        },
        {
            'name': 'Bellagio Las Vegas',
            'slug': 'bellagio-las-vegas',
            'city': las_vegas,
            'address': '3600 Las Vegas Blvd S',
            'zip_code': '89109',
            'latitude': '36.1126',
            'longitude': '-115.1767',
            'phone': '(888) 987-6667',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Penthouse and fountain view suites feature oversized jetted tubs',
            'price_from': '299.00',
            'guest_rating': '4.6',
            'review_count': 15234,
            'is_featured': True,
            'occasions': [romantic, luxury, proposal],
            'amenities': [king_bed, wifi, city_view, pool, spa],
            'seo_title': 'Las Vegas Strip Hotel with Jacuzzi Suites | Bellagio',
            'seo_description': 'Luxury Vegas hotel with verified in-room jacuzzis. Fountain view suites perfect for proposals and anniversaries.',
            'primary_keyword': 'las vegas hotels with jacuzzi in room',
        },
        {
            'name': 'Carneros Resort and Spa',
            'slug': 'carneros-resort-napa',
            'city': napavalley,
            'address': '4048 Sonoma Hwy',
            'zip_code': '94559',
            'latitude': '38.2494',
            'longitude': '-122.3194',
            'phone': '(707) 299-4900',
            'is_jacuzzi_verified': True,
            'verification_notes': 'Private cottages with outdoor hot tubs on patios overlooking vineyards',
            'price_from': '695.00',
            'guest_rating': '4.8',
            'review_count': 876,
            'is_featured': True,
            'occasions': [romantic, honeymoon, luxury],
            'amenities': [fireplace, king_bed, wifi, pool, spa],
            'seo_title': 'Napa Valley Resort with Private Hot Tub | Carneros',
            'seo_description': 'Luxury Napa cottages with verified private hot tubs. Wine country romance at its finest with vineyard views.',
            'primary_keyword': 'napa valley hotels with hot tub',
        },
    ]
    
    created_count = 0
    for hotel_data in hotels_data:
        occasions = hotel_data.pop('occasions')
        amenities = hotel_data.pop('amenities')
        
        hotel, created = Hotel.objects.get_or_create(
            slug=hotel_data['slug'],
            defaults=hotel_data
        )
        
        if created:
            hotel.occasions.set(occasions)
            hotel.amenities.set(amenities)
            created_count += 1
    
    print(f"✓ Created {created_count} sample hotels ({Hotel.objects.count()} total)")


def create_sample_blog_posts():
    """Create initial blog posts"""
    admin = User.objects.filter(is_superuser=True).first()
    if not admin:
        print("⚠ No admin user found, skipping blog posts")
        return
    
    tn = State.objects.get(slug='tennessee')
    fl = State.objects.get(slug='florida')
    
    posts_data = [
        {
            'title': 'What Is a Jacuzzi Suite in a Hotel? Complete Guide 2025',
            'slug': 'what-is-jacuzzi-suite-hotel-guide',
            'author': admin,
            'excerpt': 'Everything you need to know about booking hotels with in-room jacuzzis, from verification tips to what to expect.',
            'content': '''
## Understanding Jacuzzi Suites

A **jacuzzi suite** or **whirlpool suite** is a hotel room that features a private jetted tub inside the guest room itself—not just in a shared spa facility. This distinction is crucial for travelers seeking privacy and romance.

### Key Features of True In-Room Jacuzzi Suites:

1. **Private Access**: The jacuzzi is exclusively for your room's guests
2. **Inside the Room**: Located in the bedroom or bathroom, not on a shared deck
3. **Jetted Water**: Circulating water with massage jets (not just a deep soaking tub)
4. **Verified Listings**: Always confirm with the hotel before booking

### Common Confusion: In-Room vs. Shared Facilities

Many hotels advertise "jacuzzi access" when they actually mean:
- Shared hot tubs by the pool
- Communal spa facilities
- Outdoor tubs accessible to all guests

Our verification process ensures every listing on Hotel Location Finder has **confirmed in-room jacuzzis**.

### What to Expect in Your Jacuzzi Suite

**Amenities Typically Included:**
- Plush robes and slippers
- Premium bath products
- Champagne or wine upon arrival (in romantic packages)
- Privacy curtains or screens
- Mood lighting

**Questions to Ask Before Booking:**
1. Is the jacuzzi truly inside the room?
2. How many jets does it have?
3. Is it cleaned between guests?
4. Are there additional fees?

---

*Last updated: August 2025*
            ''',
            'category': 'tips',
            'primary_keyword': 'what is a jacuzzi suite in a hotel',
            'secondary_keywords': 'jacuzzi suite, whirlpool room, hotel hot tub guide',
            'is_published': True,
            'reading_time': '8 min read',
            'schema_type': 'Article',
        },
        {
            'title': 'Top 10 Romantic Hotels with Jacuzzi in Gatlinburg TN',
            'slug': 'romantic-hotels-jacuzzi-gatlinburg-tennessee',
            'author': admin,
            'excerpt': 'Discover the most romantic verified jacuzzi hotels in Gatlinburg, from mountain cabins to luxury resorts.',
            'content': '''
## Best Gatlinburg Hotels for Romance

Gatlinburg, Tennessee is the ultimate romantic getaway destination, nestled in the Great Smoky Mountains. Here are our hand-verified picks for hotels with in-room jacuzzis perfect for couples.

### 1. The Lodge at Buckberry Creek ⭐⭐⭐⭐⭐

**Why We Love It:** Authentic mountain luxury with verified in-room jetted tubs and stunning mountain views.

- **Price Range:** $249–$599/night
- **Best For:** Honeymoons, anniversaries
- **Jacuzzi Type:** Oversized corner jetted tub in master suite
- **Verification Date:** July 2025

**Guest Reviews Highlight:**
> "The jacuzzi was spotless and the mountain views were breathtaking. Perfect for our anniversary!"

### 2. Westgate Smoky Mountain Resort ⭐⭐⭐⭐

**Why We Love It:** Family-friendly option that doesn't skimp on romance—select suites have amazing in-room whirlpools.

- **Price Range:** $189–$449/night
- **Best For:** Couples who want resort amenities
- **Jacuzzi Type:** Deep soaking whirlpool tub

---

*Continue reading for all 10 verified properties...*

**Planning Tips for Gatlinburg:**
- Book 3-6 months ahead for peak fall foliage season
- Many hotels offer romance packages with champagne and chocolates
- Consider mid-week stays for better rates

---

*Last updated: August 2025*
            ''',
            'category': 'destination',
            'primary_keyword': 'romantic hotels with jacuzzi in gatlinburg',
            'secondary_keywords': 'gatlinburg jacuzzi suites, smoky mountain romantic hotels',
            'is_published': True,
            'reading_time': '12 min read',
            'schema_type': 'Article',
            'related_states': [tn],
        },
        {
            'title': 'Cheap Hotels with Jacuzzi In Room Under $150',
            'slug': 'cheap-hotels-jacuzzi-in-room-under-150',
            'author': admin,
            'excerpt': 'Budget-friendly doesn\'t mean sacrificing romance. Find verified affordable jacuzzi hotels across the US.',
            'content': '''
## Affordable Luxury: Jacuzzis on a Budget

You don't need to spend a fortune to enjoy a romantic in-room jacuzzi. Here's how to find verified budget-friendly options.

### Money-Saving Strategies:

1. **Book Off-Season**: January-March offers the best rates
2. **Mid-Week Stays**: Sunday-Thursday can save 30-50%
3. **Last-Minute Deals**: Apps like HotelTonight offer same-day discounts
4. **Loyalty Programs**: Join hotel rewards for member-only rates

### Verified Budget-Friendly Chains:

**Comfort Suites & Quality Inn**
- Many locations offer whirlpool suites
- Typical rate: $99-$149/night
- Consistent quality standards

**Red Roof Inn +**
- Select locations have jacuzzi rooms
- Typical rate: $79-$129/night
- Pet-friendly options

### Red Flags to Avoid:

❌ "Shared hot tub access" (not in-room)
❌ No recent photos of the actual room
❌ Vague descriptions like "spa amenities"
❌ Prices that seem too good to be true

---

**Pro Tip:** Always call the hotel directly after booking to confirm your room has an in-room jacuzzi, not just a regular bathtub.

---

*Last updated: August 2025*
            ''',
            'category': 'budget',
            'primary_keyword': 'cheap hotels with jacuzzi in room',
            'secondary_keywords': 'budget jacuzzi hotels, affordable whirlpool suites, under $150',
            'is_published': True,
            'reading_time': '7 min read',
            'schema_type': 'FAQPage',
            'faq_data': {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Are cheap jacuzzi hotels safe and clean?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes! Budget chains like Comfort Suites maintain strict cleanliness standards. Always check recent guest reviews and verify the jacuzzi is properly maintained."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What's the difference between a jacuzzi and whirlpool tub?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Jacuzzi is a brand name; whirlpool refers to any jetted tub. Functionally they're the same—both use water jets for massage."
                        }
                    }
                ]
            },
        },
    ]
    
    created_count = 0
    for post_data in posts_data:
        related_states = post_data.pop('related_states', [])
        
        post, created = BlogPost.objects.get_or_create(
            slug=post_data['slug'],
            defaults=post_data
        )
        
        if created:
            if related_states:
                post.related_states.set(related_states)
            created_count += 1
    
    print(f"✓ Created {created_count} sample blog posts ({BlogPost.objects.count()} total)")


def main():
    """Run all seed functions"""
    print("\n🏨 Seeding Hotel Location Finder Database...\n")
    
    create_superuser()
    create_amenities()
    create_occasions()
    create_states_and_cities()
    create_sample_hotels()
    create_sample_blog_posts()
    
    print("\n✅ Database seeding complete!\n")
    print("Access the admin panel at: http://localhost:8000/admin/")
    print("Login: admin / admin123\n")


if __name__ == '__main__':
    main()
