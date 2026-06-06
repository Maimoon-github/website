import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';

interface KnowledgeCardProps {
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export default function KnowledgeCard({ title, slug, description, icon, order }: KnowledgeCardProps) {
  // Dynamically resolve icon if it exists in lucide
  const IconComponent = (Icons as any)[icon] || Icons.Brain;

  return (
    <Link href={`/knowledge/${slug}`} className="group h-full">
      <Card className="h-full p-8 transition-all duration-500 group-hover:bg-accent-purple/5 border-white/5 group-hover:border-accent-purple/20">
        <CardContent className="p-0">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-purple/30 transition-transform">
              <IconComponent className="text-accent-light w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-gray-700 group-hover:text-accent-purple/50 transition-colors">
              DOMAIN_{order.toString().padStart(2, '0')}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-accent-light transition-colors">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6 group-hover:text-gray-400 transition-colors">
            {description}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light/40 group-hover:text-accent-light transition-all">
            Decrypt Layer <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
