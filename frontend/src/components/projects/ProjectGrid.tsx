import { Project } from '@/services/projects.service';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
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
  )
}
