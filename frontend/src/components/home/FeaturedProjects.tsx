import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/data-display';
import ProjectCard from '@/components/projects/ProjectCard';

interface FeaturedProjectsProps {
  projects: any[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-24 bg-bg-deep/50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Production Assets"
          title="Featured"
          highlightedWord="Projects"
        >
          <Link href="/projects">
            <Button variant="ghost" className="gap-2 group">
              Registry Explorer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.slice(0, 3).map((project) => (
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
          )) : (
            <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/5 opacity-50">
              <p className="font-mono text-xs uppercase tracking-widest">Awaiting Project Data Deployment...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
