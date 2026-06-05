import { getProjectBySlug } from '../../../lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  if (!project) return {};
  return { title: `${project.title} | Antigravity` };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  if (!project) notFound();

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
  
  return (
    <main className="min-h-screen bg-[var(--void)] text-[var(--foreground)] pb-32">
      {/* Immersive Header */}
      <header className="relative py-48 overflow-hidden">
        {project.cover_image && (
          <div className="absolute inset-0 z-0 opacity-20">
            <Image 
              src={project.cover_image.startsWith('http') ? project.cover_image : `${backendUrl}${project.cover_image}`} 
              alt="" 
              fill
              className="object-cover blur-2xl scale-110" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)] via-[var(--void)]/80 to-[var(--void)]" />
          </div>
        )}
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-10">
          <Link href="/projects" className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest text-[var(--accent)] hover:text-[var(--foreground)] transition-colors mb-12 uppercase">
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            <span>RETURN TO ARCHIVES</span>
          </Link>

          <div className="pill-badge mb-8 w-fit text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF] animate-pulse" />
            {project.category_display || 'OPERATION_MANIFEST'}
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-16 tracking-tighter leading-[0.9]">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-[var(--accent)] italic block' : 'block'}>
                {word}
              </span>
            ))}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-[#8B65BF]/20 pt-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B65BF] mb-3">Principal_Role</p>
              <p className="text-lg font-bold">{project.role || 'System Architect'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B65BF] mb-3">Project_Client</p>
              <p className="text-lg font-bold">{project.client_name || 'Confidential'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B65BF] mb-3">Timestamp</p>
              <p className="text-lg font-bold">{project.completion_date || 'Ongoing'}</p>
            </div>
            <div className="flex gap-6">
               {project.website_url && (
                <a href={project.website_url} target="_blank" className="bg-[#8B65BF] text-[#131026] px-6 py-3 rounded font-black text-[10px] tracking-widest hover:scale-105 transition-all self-start">
                  LIVE_SYS
                </a>
               )}
               {project.github_url && (
                <a href={project.github_url} target="_blank" className="border border-[#8B65BF]/40 text-[#8B65BF] px-6 py-3 rounded font-black text-[10px] tracking-widest hover:bg-[#8B65BF]/10 transition-all self-start">
                  RESOURCES
                </a>
               )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-20 py-20">
        {/* Left Column: Description */}
        <div className="lg:col-span-7">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B65BF] mb-10">Operation_Summary</h2>
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[#968E9C]">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right Column: Stack */}
        <div className="lg:col-span-5">
           <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B65BF] mb-10">Stack_Configuration</h2>
           <div className="grid grid-cols-2 gap-4">
              {project.technologies?.map(tech => (
                <div key={tech.id} className="p-6 rounded-xl bg-[#1F1A40]/30 border border-[#8B65BF]/10 flex flex-col gap-4 group hover:border-[#8B65BF]/40 transition-all">
                   <span className="text-xs font-black tracking-widest uppercase text-[#E5DEFE]">{tech.name}</span>
                   <div className="h-0.5 w-8 bg-[#8B65BF]/30 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-10 py-32 border-t border-[#8B65BF]/10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B65BF] mb-16">Visual_Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.gallery.map((img) => (
              <figure key={img.id} className="space-y-4 group">
                <div className="overflow-hidden rounded-2xl border border-[#8B65BF]/10 relative aspect-video">
                   <Image 
                    src={img.image.startsWith('http') ? img.image : `${backendUrl}${img.image}`} 
                    alt={img.caption || "Project Visual"} 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                   />
                </div>
                {img.caption && (
                  <figcaption className="text-xs font-mono text-[var(--accent)]/60 tracking-wider uppercase">
                    {`// ${img.caption}`}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
