import { getProjects } from '../../lib/projects';
import ProjectCard from '../../components/ProjectCard';

export const metadata = {
  title: 'Projects | Antigravity',
  description: 'Showcasing our premium digital experiences.',
};

export default async function ProjectsListPage() {
  const projects = await getProjects();

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-black dark:text-white">
            Selected <span className="text-indigo-600 italic">Work</span>.
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Crafting digital solutions that challenge status quo.
            Every project is a journey from the impossible to the premium.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
