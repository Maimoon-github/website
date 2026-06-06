import BlogCard from '@/components/blog/BlogCard';
import { BlogService } from '@/services/blog.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
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
        <ErrorMessage message={error} />
      ) : posts && posts.length > 0 ? (
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
        <EmptyState 
          title="No Transmissions" 
          description="Awaiting technical logs from the decentralized network nodes."
        />
      )}
    </Container>
  );
}
