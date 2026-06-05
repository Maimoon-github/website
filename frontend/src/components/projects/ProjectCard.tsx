import Link from 'next/link';
import { Project } from '../../types';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
  const imageUrl = project.cover_image 
    ? (project.cover_image.startsWith('http') ? project.cover_image : `${backendUrl}${project.cover_image}`)
    : null;

  return (
    <div className="bg-[var(--void)] group relative overflow-hidden flex flex-col h-full border border-[var(--surface)] rounded-2xl hover:border-[var(--accent)]/40 transition-all duration-500">
      {/* Image Section */}
      <div className="aspect-[16/10] overflow-hidden relative border-b border-[var(--surface)]">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={project.title} 
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
             <span className="text-[var(--accent)]/20 font-mono text-[10px] tracking-widest">IMAGE_PENDING</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] to-transparent opacity-60" />
      </div>

      {/* Project Information Section */}
      <div className="p-8 flex-grow flex flex-col bg-[var(--surface)]/10 group-hover:bg-[var(--surface)]/20 transition-all">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="text-[9px] font-black tracking-[0.2em] text-[var(--accent)] uppercase px-2 py-1 bg-[var(--accent)]/10 rounded">
               {project.category_display || 'OPERATION'}
             </span>
          </div>
          <h3 className="text-2xl font-black text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed mb-6 font-medium">
            {project.short_info || project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span key={tech.id} className="text-[9px] font-mono text-[var(--accent)]/60 bg-[var(--accent)]/5 px-2 py-0.5 rounded border border-[var(--accent)]/10">
                {tech.name}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-[9px] font-mono text-[var(--accent)]/40 px-2 py-0.5">
                +{project.technologies.length - 3} MORE
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/projects/${project.slug}`} 
            className="mt-auto inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-[var(--accent)] hover:text-[var(--foreground)] transition-all group/link"
          >
            <span>ACCÈS ARCHIVE</span>
            <svg className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          {(project.website_url || project.github_url) && (
            <div className="flex gap-4">
              {project.website_url && (
                <a href={project.website_url} target="_blank" className="text-[10px] font-black text-[var(--muted)] hover:text-[var(--foreground)] transition-colors tracking-widest border-b border-transparent hover:border-[var(--foreground)] pb-1">
                  LIVE
                </a>
              )}
               {project.github_url && (
                <a href={project.github_url} target="_blank" className="text-[10px] font-black text-[#968E9C] hover:text-[#E5DEFE] transition-colors tracking-widest border-b border-transparent hover:border-[#E5DEFE] pb-1">
                  CODE
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
