import { getProjects } from '../../lib/projects';
import ProjectCard from '../../components/projects/ProjectCard';

export const metadata = {
  title: 'Archives | Antigravity',
  description: 'Showcasing our premium digital experiences.',
};

export default async function ProjectsListPage() {
  const projects = await getProjects();

  return (
    <main className="bg-[#131026] min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="max-w-4xl mb-24">
          <div className="pill-badge mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF] animate-pulse" />
            Project Archive Status: ONLINE
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 text-[#E5DEFE] leading-[0.95]">
            Selected <br/>
            <span className="lotus-gradient-text italic">Architecture</span>.
          </h1>
          <p className="text-xl md:text-2xl text-[#968E9C] font-medium leading-relaxed max-w-2xl">
            Crafting autonomous systems and digital monoliths that challenge the status quo. 
            Every archive entry represents a synthesis of logic and ethereal design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.length > 0 ? projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          )) : (
            <div className="col-span-full py-32 text-center border border-dashed border-[#8B65BF]/20 rounded-3xl">
               <span className="text-[#8B65BF] font-mono text-sm uppercase tracking-[0.4em] animate-pulse">Scanning_Archival_Database...</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
