import { ProjectService } from '@/services/projects.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';
import { ProjectGrid } from '@/components/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { data: projects, error } = await ProjectService.getProjects();

  return (
    <Container className="pt-32 pb-24">
      <PageHeader 
        badge="Production Repository"
        title="SELECTED"
        highlightedWord="WORKS"
        description="A showcase of production-ready Agentic AI systems and full-stack applications."
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
