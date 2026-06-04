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

export interface Project {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  description: string;
  completion_date: string;
  website_url: string;
  is_featured: boolean;
  cover_image: string | null;
  short_info: string;
  icon_name: string;
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

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  detailed_description: string;
  icon_name: string;
  price_starting_at: string;
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
