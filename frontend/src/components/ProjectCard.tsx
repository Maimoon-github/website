import Link from 'next/link';
import { Project } from '../types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
      {project.cover_image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={project.cover_image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        <p className="text-zinc-300 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex gap-4">
          <Link 
            href={`/projects/${project.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-indigo-400"
          >
            Case Study
          </Link>
          {project.website_url && (
            <a 
              href={project.website_url} 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
