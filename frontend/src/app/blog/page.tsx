import { BlogService } from '@/services/blog.service';
import { CoreService } from '@/services/core.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';
import { PostGrid } from '@/components/blog';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const [
    { data: posts, error },
    { data: header }
  ] = await Promise.all([
    BlogService.getPosts(),
    CoreService.getPageHeader('blog')
  ]);

  return (
    <Container className="pt-32 pb-24">
      <PageHeader 
        badge={header?.badge || "Transmission Log"}
        title={header?.title || "TECHNICAL"}
        highlightedWord={header?.highlighted_word || "LOGS"}
        description={header?.description || "In-depth exploration of Agentic AI Engineering, architecture patterns, and the future of autonomy."}
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
