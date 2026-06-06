import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { ProjectService } from '@/services/projects.service';
import { PageHeader } from '@/components/shared/data-display';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { data: projects, error } = await ProjectService.getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4">
          <PageHeader 
            badge="Production Repository"
            title="SELECTED"
            highlightedWord="WORKS"
            description="A showcase of production-ready Agentic AI systems and full-stack applications."
          />

          {error ? (
            <div className="glass p-20 text-center rounded-3xl border border-red-500/20 bg-red-500/5">
              <p className="text-red-400 font-mono uppercase tracking-widest">{error}</p>
              <p className="text-gray-500 text-sm mt-4">Check if the backend system is tactical.</p>
            </div>
          ) : projects.length > 0 ? (
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
            <div className="glass p-20 text-center rounded-3xl border-dashed border-white/10">
              <p className="text-gray-500 font-mono uppercase tracking-widest">No projects found in this registry.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
