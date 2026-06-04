import Link from 'next/link';
import { Project } from '../../types';

export default function ProjectCard({ project }: { project: Project }) {
  const backendUrl = 'http://localhost:8000';
  const imageUrl = project.cover_image 
    ? (project.cover_image.startsWith('http') ? project.cover_image : `${backendUrl}${project.cover_image}`)
    : null;

  return (
    <div className="bg-[#131026] group relative overflow-hidden flex flex-col h-full border border-[#8B65BF]/10 hover:border-[#8B65BF]/40 rounded-2xl transition-all duration-500">
      {/* Image Section */}
      <div className="aspect-[16/10] overflow-hidden relative border-b border-[#8B65BF]/10">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-[#1F1A40]/50 flex items-center justify-center">
             <span className="text-[#8B65BF]/30 font-mono text-[10px]">IMAGE_NOT_LOADED</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131026] to-transparent opacity-60" />
      </div>

      {/* Project Information Section */}
      <div className="p-8 flex-grow flex flex-col justify-between bg-[#1F1A40]/10 group-hover:bg-[#1F1A40]/30 transition-all">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-[#E5DEFE] group-hover:text-[#8B65BF] transition-colors leading-tight">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-[#8B65BF] opacity-50 uppercase tracking-widest pt-1">
              [Arch_v2.0]
            </span>
          </div>
          <p className="text-sm text-[#968E9C] line-clamp-3 leading-relaxed mb-8 font-medium">
            {project.short_info || project.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest text-[#8B65BF] hover:text-[#E5DEFE] transition-colors">
            <span>EXPLORE ARCHIVE</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          
          {project.website_url && (
            <a href={project.website_url} target="_blank" className="text-[10px] font-black text-[#968E9C] hover:text-[#E5DEFE] transition-colors tracking-widest border-b border-transparent hover:border-[#E5DEFE] pb-1">
              LIVE_PROTO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
