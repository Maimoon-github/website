import { BlogService } from '@/services/blog.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';
import { PostGrid } from '@/components/blog';

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
        <PostGrid posts={posts} />
      ) : (
        <EmptyState 
          title="No Transmissions" 
          description="Awaiting technical logs from the decentralized network nodes."
        />
      )}
    </Container>
  );
}
