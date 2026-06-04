import { getProjectBySlug } from '../../../lib/projects';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} | Antigravity` };
}

export default async function ProjectDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen">
      {/* Dynamic Hero */}
      <header className="relative py-40 overflow-hidden bg-zinc-950">
        {project.cover_image && (
          <div className="absolute inset-0 z-0">
            <img src={project.cover_image} alt="" className="w-full h-full object-cover opacity-30 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-indigo-400 font-bold mb-6">
            <span>Project</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>{project.client_name}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-12 text-zinc-400 border-t border-zinc-800 pt-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Service</p>
              <p className="text-white font-medium">Full Stack Development</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Completion</p>
              <p className="text-white font-medium">{project.completion_date}</p>
            </div>
            {project.website_url && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Live URL</p>
                <a href={project.website_url} target="_blank" className="text-indigo-400 hover:text-white transition-colors">Visit Website</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="prose prose-xl prose-zinc dark:prose-invert max-w-none">
          <p className="text-2xl leading-relaxed text-zinc-600 dark:text-zinc-300 italic mb-12">
            {project.description}
          </p>
          {/* Detailed content would normally go here */}
        </div>
      </section>
    </main>
  );
}
