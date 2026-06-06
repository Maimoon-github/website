import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  image: string;
  category: string;
}

export default function BlogCard({ title, excerpt, date, readingTime, slug, image, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden border-white/5 hover:border-accent-purple/40 transition-all duration-500">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge variant="glow">{category}</Badge>
          </div>
        </div>
        
        <CardContent className="flex-1 p-8">
          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 mb-4 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readingTime}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-accent-light transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-light group-hover:gap-4 transition-all">
            Read Transmission <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
