import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TagList } from '@/components/shared/data-display';

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  image: string;
  category: string;
  github_url?: string | null;
  live_url?: string | null;
  priority?: boolean;
}

export default function ProjectCard({ 
  title, slug, description, tech_stack, image, category, github_url, live_url, priority = false
}: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col group border-white/5 hover:border-accent-purple/30 overflow-hidden transition-all duration-700">
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="backdrop-blur-md bg-accent-mid/30">{category}</Badge>
        </div>
      </div>
      
      <CardContent className="p-8 flex-1 flex flex-col">
        <TagList tags={tech_stack} limit={3} className="mb-6" />
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-light transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link href={`/projects/${slug}`}>
            <Button variant="ghost" size="sm" className="group/btn gap-2 font-bold uppercase tracking-wider text-[10px]">
              Details <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex gap-3">
            {github_url && (
              <a href={github_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {live_url && (
              <a href={live_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
