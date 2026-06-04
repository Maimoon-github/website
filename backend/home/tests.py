from django.test import TestCase
from .models import HeroSection

class HeroSectionTest(TestCase):
    def setUp(self):
        HeroSection.objects.create(
            title="Test Hero",
            subtitle="Test Subtitle",
            is_active=True
        )

    def test_hero_creation(self):
        hero = HeroSection.objects.get(title="Test Hero")
        self.assertEqual(hero.subtitle, "Test Subtitle")
        self.assertTrue(hero.is_active)
