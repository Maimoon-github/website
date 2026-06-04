import { getProjects } from '../../lib/projects';
import ProjectCard from '../../components/projects/ProjectCard';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[var(--void)] text-[var(--foreground)] py-32 px-10">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-20">
          <div className="pill-badge mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF] animate-pulse" />
            VIRTUAL ARCHIVE REPOSITORY
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            SELECTED <br/>
            <span className="text-[var(--accent)] italic">OPERATIONS</span>
          </h1>
          <p className="text-xl text-[#968E9C] font-medium max-w-2xl leading-relaxed">
            Exploration of autonomous agents, system architectures, and neural interfaces 
            developed to push the boundaries of agentic AI.
          </p>
        </header>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border border-dashed border-[var(--accent)]/20 rounded-3xl">
              <span className="text-[var(--accent)] font-mono text-sm uppercase tracking-widest">
                [No_Data_Streams_Found]
              </span>
            </div>
          )}
        </div>

        {/* Call to Action or Footer bit */}
        <div className="mt-32 p-16 rounded-3xl bg-[var(--surface)]/30 border border-[var(--accent)]/20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[80px] rounded-full group-hover:bg-[var(--accent)]/20 transition-all duration-700" />
          <h2 className="text-3xl font-black mb-6 relative z-10">HAVE A PROTOCOL TO DISCUSS?</h2>
          <p className="text-[#968E9C] mb-10 max-w-xl mx-auto relative z-10">
            I am always interested in architecting new autonomous systems and exploring LLM frontiers.
          </p>
          <Link href="/contact" className="inline-block bg-[var(--accent)] text-[var(--void)] px-10 py-5 rounded-md font-black text-xs tracking-widest transition-all hover:scale-105 shadow-[0_0_40px_rgba(139,101,191,0.3)] relative z-10">
            ESTABLISH CONNECTION
          </Link>
        </div>
      </div>
    </main>
  );
}
