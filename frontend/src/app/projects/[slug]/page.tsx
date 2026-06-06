import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProjectService } from '@/services/projects.service';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, ArrowLeft, Layers, Cpu, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { data: project, error } = await ProjectService.getProject(params.slug);

  if (error || !project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-light transition-colors mb-12 font-mono text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Registry
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <header className="mb-12">
                <Badge variant="glow" className="mb-6">{project.category_name}</Badge>
                <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {project.short_description}
                </p>
              </header>

              <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-white/5">
                {project.github_url && (
                   <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                     <Button variant="primary" className="gap-2">
                       <Github className="w-5 h-5" /> Source Code
                     </Button>
                   </a>
                )}
                {project.live_url && (
                   <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                     <Button variant="glass" className="gap-2">
                       <ExternalLink className="w-5 h-5" /> Live Interface
                     </Button>
                   </a>
                )}
              </div>

              <div className="space-y-8">
                 <div>
                   <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em] mb-4">Core Architecture</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 glass rounded-2xl border-white/5 flex items-center gap-4">
                        <Cpu className="text-accent-light w-5 h-5" />
                        <div>
                          <div className="text-xs font-bold">Latency</div>
                          <div className="text-[10px] text-gray-500 font-mono">150ms Opt</div>
                        </div>
                      </div>
                      <div className="p-6 glass rounded-2xl border-white/5 flex items-center gap-4">
                        <Shield className="text-accent-light w-5 h-5" />
                        <div>
                          <div className="text-xs font-bold">Security</div>
                          <div className="text-[10px] text-gray-500 font-mono">End-to-End</div>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="relative">
               <div className="sticky top-32">
                 <div className="rounded-3xl overflow-hidden glass p-3 border-white/10 shadow-2xl">
                    <img 
                      src={project.featured_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"} 
                      alt={project.title}
                      className="w-full h-auto rounded-2xl"
                    />
                 </div>
                 
                 <div className="mt-8 grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-video glass rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer border-white/5">
                        <img src={`https://images.unsplash.com/photo-${1677442136019 + i}?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter flex items-center gap-4">
                <Layers className="text-accent-purple" /> System Implementation
              </h2>
              <div className="prose prose-invert prose-purple max-w-none text-gray-400 space-y-6 text-lg leading-relaxed">
                <p>{project.description}</p>
                <div className="bg-bg-deep rounded-2xl p-10 border border-white/5 my-12">
                   <h4 className="text-white font-mono uppercase tracking-widest text-sm mb-6">Technical Specifications</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <h5 className="text-accent-light text-xs font-bold uppercase mb-3">Model Core</h5>
                       <p className="text-sm font-mono tracking-wider">GPT-4-TURBO-VISION</p>
                     </div>
                     <div>
                       <h5 className="text-accent-light text-xs font-bold uppercase mb-3">Response Mode</h5>
                       <p className="text-sm font-mono tracking-wider">ASYNCHRONOUS_PULSE</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
               <div>
                 <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter">Technology Stack</h3>
                 <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map(tech => (
                      <Badge key={tech} variant="secondary" className="px-4 py-2 font-mono text-[10px] uppercase">
                        {tech}
                      </Badge>
                    ))}
                 </div>
               </div>

               <div className="p-8 glass border border-accent-purple/20 bg-accent-purple/5 rounded-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="text-accent-light" />
                    <h3 className="font-bold uppercase tracking-tighter">Live Status</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                     <span>OP_CODE: 200_OK_NODE_STABLE</span>
                  </div>
                  <Button variant="outline" className="w-full">Initialize Session</Button>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
