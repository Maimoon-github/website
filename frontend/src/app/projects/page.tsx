import { ProjectService } from '@/services/projects.service';
import { CoreService } from '@/services/core.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';
import { ProjectGrid } from '@/components/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const [
    { data: projects, error },
    { data: header }
  ] = await Promise.all([
    ProjectService.getProjects(),
    CoreService.getPageHeader('projects')
  ]);

  return (
    <Container className="pt-24 pb-20">
      <PageHeader 
        badge={header?.badge || "Production Repository"}
        title={header?.title || "SELECTED"}
        highlightedWord={header?.highlighted_word || "WORKS"}
        description={header?.description || "A showcase of production-ready Agentic AI systems and full-stack applications."}
      />

      {error ? (
        <ErrorMessage message={error} />
      ) : projects && projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <EmptyState 
          title="Registry Empty" 
          description="No projects found in this registry. System is awaiting data deployment."
        />
      )}
    </Container>
  );
}
