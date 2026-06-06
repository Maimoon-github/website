import BlogCard from '@/components/blog/BlogCard';
import { BlogService } from '@/services/blog.service';
import { PageHeader } from '@/components/shared/data-display';
import Container from '@/components/layout/Container';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const { data: posts, error } = await BlogService.getPosts();

  return (
    <Container className="pt-32 pb-24">
          <PageHeader 
            badge="Transmission Log"
            title="TECHNICAL"
            highlightedWord="LOGS"
            description="In-depth exploration of Agentic AI Engineering, architecture patterns, and the future of autonomy."
          />

          {error ? (
            <div className="glass p-20 text-center rounded-3xl border border-red-500/20 bg-red-500/5">
              <p className="text-red-400 font-mono uppercase tracking-widest">{error}</p>
              <p className="text-gray-500 text-sm mt-4">Buffer sync failed. Node offline.</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                  readingTime="12 min read"
                  slug={post.slug}
                  image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
                  category={post.category_name}
                />
              ))}
            </div>
          ) : (
            <div className="glass p-20 text-center rounded-3xl border-dashed border-white/10">
              <p className="text-gray-500 font-mono uppercase tracking-widest">No transmissions found in current sector.</p>
            </div>
          )}
    </Container>
  );
}
