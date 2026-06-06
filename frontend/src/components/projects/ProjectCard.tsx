import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  image: string;
  category: string;
  github_url?: string;
  live_url?: string;
}

export default function ProjectCard({ 
  title, slug, description, tech_stack, image, category, github_url, live_url 
}: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col group border-white/5 hover:border-accent-purple/30 overflow-hidden transition-all duration-700">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="backdrop-blur-md bg-accent-mid/30">{category}</Badge>
        </div>
      </div>
      
      <CardContent className="p-8 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-6">
          {tech_stack.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-mono tracking-widest uppercase py-1 px-3 rounded-full border border-white/10 text-gray-500 bg-white/5">
              {tag}
            </span>
          ))}
          {tech_stack.length > 3 && (
            <span className="text-[10px] font-mono tracking-widest uppercase py-1 px-3 rounded-full border border-white/10 text-gray-500 bg-white/5">
              +{tech_stack.length - 3}
            </span>
          )}
        </div>
        
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
