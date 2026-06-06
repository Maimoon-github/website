import { ProjectService } from '@/services/projects.service';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Github, ExternalLink, ArrowLeft, Layers, Cpu, Activity } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Container from '@/components/layout/Container';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: project, error } = await ProjectService.getProject(slug);

  if (error || !project) {
    notFound();
  }

  return (
    <Container className="pt-24 pb-20">
      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-light transition-colors mb-8 font-mono text-xs uppercase tracking-widest group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Registry
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <header className="mb-10">
            <Badge className="mb-4 bg-accent-purple/20 text-accent-light border-accent-purple/30">{project.category_name}</Badge>
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
              {project.title}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {project.short_description}
            </p>
          </header>

          <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-white/5">
            {project.github_url && (
               <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                 <Button className="gap-2 bg-accent-purple hover:bg-accent-purple/90">
                   <Github className="w-5 h-5" /> Source Code
                 </Button>
               </a>
            )}
            {project.live_url && (
               <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                 <Button variant="ghost" className="gap-2 glass hover:bg-white/5">
                   <ExternalLink className="w-5 h-5" /> Live Interface
                 </Button>
               </a>
            )}
          </div>

          <div className="space-y-8">
             <div>
               <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em] mb-4">Core Architecture</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.tech_specs || {}).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="p-5 glass rounded-2xl border-white/5 flex items-center gap-4">
                      <Cpu className="text-accent-light w-5 h-5" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-tight">{key}</div>
                        <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{value}</div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(project.tech_specs || {}).length === 0 && (
                    <div className="p-6 glass rounded-2xl border-white/5 flex items-center gap-4 opacity-50">
                      <Cpu className="text-gray-600 w-5 h-5" />
                      <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Awaiting Node Specs...</div>
                    </div>
                  )}
               </div>
             </div>
          </div>
        </div>

        <div className="relative">
            <div className="sticky top-24">
             <div className="rounded-3xl overflow-hidden glass p-3 border-white/10 shadow-2xl relative">
                <div className="relative w-full aspect-video">
                  <Image 
                    src={project.featured_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
             </div>
             
             <div className="mt-8 grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-video glass rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer border-white/5 relative">
                    <Image 
                      src={`https://images.unsplash.com/photo-${1677442136019 + i}?auto=format&fit=crop&q=80&w=200`} 
                      fill
                      sizes="(max-width: 1024px) 25vw, 200px"
                      className="object-cover" 
                      alt="Gallery" 
                    />
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter flex items-center gap-4 text-white">
            <Layers className="text-accent-purple" /> System Implementation
          </h2>
          <div className="prose prose-invert prose-purple max-w-none text-gray-400 space-y-6 text-lg leading-relaxed">
            <p>{project.description}</p>
            <div className="bg-bg-deep rounded-2xl p-8 border border-white/5 my-8">
               <h4 className="text-white font-mono uppercase tracking-widest text-sm mb-6">Technical Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {Object.entries(project.tech_specs || {}).map(([key, value]) => (
                   <div key={key}>
                     <h5 className="text-accent-light text-xs font-bold uppercase mb-2">{key}</h5>
                     <p className="text-sm font-mono tracking-wider">{value.toUpperCase()}</p>
                   </div>
                 ))}
                 {Object.keys(project.tech_specs || {}).length === 0 && (
                   <div className="col-span-full text-xs text-gray-700 font-mono italic">No additional registry metadata provided.</div>
                 )}
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-tighter text-white">Technology Stack</h3>
             <div className="flex flex-wrap gap-2">
                {Array.isArray(project.tech_stack) ? project.tech_stack.map(tech => (
                  <Badge key={tech} variant="secondary" className="px-4 py-2 font-mono text-[10px] uppercase">
                    {tech}
                  </Badge>
                )) : (
                  <div className="text-xs text-gray-600 font-mono italic">No stack registry entries found.</div>
                )}
             </div>
           </div>

           <div className="p-8 glass border border-accent-purple/20 bg-accent-purple/5 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-accent-light" />
                <h3 className="font-bold uppercase tracking-tighter text-white">Live Status</h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                 <span>OP_CODE: 200_OK_NODE_STABLE</span>
              </div>
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Initialize Session</Button>
           </div>
        </div>
      </div>
    </Container>
  );
}
