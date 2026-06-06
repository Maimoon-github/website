import ProjectCard from '@/components/projects/ProjectCard';
import { ProjectService } from '@/services/projects.service';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              slug={project.slug}
              description={project.short_description}
              tech_stack={project.tech_stack}
              image={project.featured_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"}
              category={project.category_name}
              github_url={project.github_url}
              live_url={project.live_url}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="Registry Empty" 
          description="No projects found in this registry. System is awaiting data deployment."
        />
      )}
    </Container>
  );
}
