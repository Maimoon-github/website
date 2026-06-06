import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/shared/data-display';
import { PostCard } from '@/components/blog';

interface LatestPostsProps {
  posts: any[]
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Communication Stream"
          title="Latest"
          highlightedWord="Logs"
        >
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 group">
              Transmission Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.length > 0 ? posts.slice(0, 2).map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.published_at}
              readingTime="15 min"
              slug={post.slug}
              image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
              category={post.category_name}
            />
          )) : (
            <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/5 opacity-50">
              <p className="font-mono text-xs uppercase tracking-widest">Awaiting Log Transmission...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
