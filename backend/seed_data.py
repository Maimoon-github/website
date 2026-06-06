import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from app.knowledge.models import Domain
from app.projects.models import Project, ProjectCategory
from app.blog.models import Post, Category
from app.homepage.models import HeroContent, StatCounter
from app.about.models import AboutProfile, Skill
from django.contrib.auth.models import User
from django.utils import timezone

def create_admin():
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
        print("Admin user created (admin/adminpass)")

def seed_homepage():
    HeroContent.objects.get_or_create(
        is_active=True,
        defaults={
            'title': "Architecting Autonomous Intelligence",
            'tagline': "The Future of Agentic AI Engineering",
            'description': "A comprehensive knowledge hub and portfolio dedicated to production-grade Agentic AI systems. From cognitive architectures to multi-agent swarms.",
            'primary_cta_text': "Explore Domains",
            'primary_cta_link': "/knowledge",
            'secondary_cta_text': "View Projects",
            'secondary_cta_link': "/projects"
        }
    )
    
    stats = [
        {'label': 'AGENTIC', 'value': '12', 'icon': 'Bot', 'order': 0},
        {'label': 'COGNITIVE', 'value': '25', 'icon': 'Cpu', 'order': 1},
        {'label': 'GOVERNED', 'value': '5', 'icon': 'Shield', 'order': 2},
        {'label': 'PRODUCTION', 'value': '10', 'icon': 'Rocket', 'order': 3},
    ]
    for stat in stats:
        StatCounter.objects.get_or_create(label=stat['label'], defaults=stat)
    print("Homepage seeded.")

def seed_about():
    AboutProfile.objects.get_or_create(
        name="Maimoon",
        defaults={
            'tagline': "Agentic AI Architect & Full-Stack Engineer",
            'bio': "Passionate about building autonomous systems and cognitive architectures.",
            'stats_domain_count': 12,
            'stats_project_count': '25+',
            'stats_experience_years': '5y+'
        }
    )
    
    skills = [
        {'name': 'Python', 'category': 'technical', 'level': 95},
        {'name': 'Next.js', 'category': 'technical', 'level': 90},
        {'name': 'AI Agents', 'category': 'domain', 'level': 85},
    ]
    for skill in skills:
        Skill.objects.get_or_create(name=skill['name'], defaults=skill)
    print("About data seeded.")

def seed_knowledge():
    # Read Agentic_AI_Content_Architecture.csv
    with open('../Referances/Agentic_AI_Content_Architecture.csv', mode='r') as file:
        reader = csv.reader(file)
        lines = list(reader)
        
        icons = ['Brain', 'Network', 'MemoryStick', 'PenTool', 'Search', 'Settings', 'Eye', 'ShieldCheck', 'Zap', 'Workflow', 'Layers', 'Terminal']
        # Domains are in the "12 Domains" section
        # Start looking from line 68
        for i in range(67, 79):
            row = lines[i]
            if len(row) < 4: continue
            name = row[2]
            desc = row[3]
            concepts = [c.strip() for c in row[4].split(',')]
            
            Domain.objects.get_or_create(
                slug=name.lower().replace(' ', '-'),
                defaults={
                    'name': name,
                    'description': desc,
                    'key_concepts': concepts,
                    'order': i - 67,
                    'icon': icons[i-67] if i-67 < len(icons) else 'Brain'
                }
            )
        print("Knowledge Domains seeded.")

def seed_projects():
    # Basic categories
    cats = [
        {'name': 'Web', 'slug': 'web'},
        {'name': 'AI', 'slug': 'ai'},
        {'name': 'Mobile', 'slug': 'mobile'},
        {'name': 'Robotics', 'slug': 'robotics'}
    ]
    for cat_data in cats:
        ProjectCategory.objects.get_or_create(slug=cat_data['slug'], defaults={'name': cat_data['name']})
    
    # Static projects based on doc
    cat = ProjectCategory.objects.first()
    Project.objects.get_or_create(
        title="Agentic Workspace Creator",
        defaults={
            'short_description': "Autonomous environment setup for AI developers.",
            'description': "Full system for managing agentic lifecycles.",
            'category': cat,
            'tech_stack': ["Next.js", "Django", "Tailwind"],
            'is_featured': True
        }
    )
    print("Projects seeded.")

def seed_blog():
    admin = User.objects.get(username='admin')
    cat, _ = Category.objects.get_or_create(slug='architecture', defaults={'name': 'Architecture'})
    
    Post.objects.get_or_create(
        title="Foundations of Agentic AI",
        defaults={
            'author': admin,
            'category': cat,
            'content': "Full guide to agentic foundations...",
            'excerpt': "Baseline concepts for AI agents.",
            'published_at': timezone.now()
        }
    )
    print("Blog seeded.")

def seed_sections():
    sections = [
        # Homepage Sections
        {'page': 'home', 'title': 'Technical Prowess', 'endpoint': 'homepage/hero/', 'component_type': 'hero', 'order': 0},
        {'page': 'home', 'title': 'Core Metrics', 'endpoint': 'homepage/stats/', 'component_type': 'stats', 'order': 1},
        {'page': 'home', 'title': 'Knowledge Layers', 'endpoint': 'knowledge/domains/', 'component_type': 'grid', 'order': 2},
        {'page': 'home', 'title': 'Active Projects', 'endpoint': 'projects/list/', 'component_type': 'grid', 'order': 3},
        
        # About Page Sections
        {'page': 'about', 'title': 'Personnel Profile', 'endpoint': 'about/profile/', 'component_type': 'profile', 'order': 0},
        {'page': 'about', 'title': 'Skills Matrix', 'endpoint': 'about/skills/', 'component_type': 'grid', 'order': 1},
        {'page': 'about', 'title': 'Professional History', 'endpoint': 'about/experience/', 'component_type': 'list', 'order': 2},
    ]
    from app.homepage.models import PageSection
    for section in sections:
        PageSection.objects.get_or_create(
            page=section['page'],
            title=section['title'],
            defaults=section
        )
    print("Page Sections seeded.")

if __name__ == '__main__':
    create_admin()
    seed_homepage()
    seed_about()
    seed_knowledge()
    seed_projects()
    seed_blog()
    seed_sections()

