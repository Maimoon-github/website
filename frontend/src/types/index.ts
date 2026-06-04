export interface Author {
  username: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: Author;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
}

export interface Technology {
  id: number;
  name: string;
  icon_name: string;
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  category_display: string;
  client_name: string;
  description: string;
  role: string;
  completion_date: string;
  website_url: string;
  github_url: string;
  is_featured: boolean;
  cover_image: string | null;
  short_info: string;
  technologies: Technology[];
  gallery: ProjectImage[];
}

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  background_image: string | null;
}

export interface AboutSection {
  id: number;
  title: string;
  content: string;
  mission_statement: string;
  vision_statement: string;
  featured_image: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  linkedin_url: string;
  twitter_url: string;
}

export interface AboutData {
  section: AboutSection | null;
  team: TeamMember[];
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  detailed_description: string;
  icon_name: string;
  price_starting_at: string | null;
  is_active: boolean;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
  google_maps_url: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
