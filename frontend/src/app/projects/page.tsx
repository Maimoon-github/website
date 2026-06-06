import Navbar from '@/components/layout/Navbar';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for initial presentation
const projects = [
  {
    title: "Neuro-Symbolic Agent Core",
    slug: "neuro-symbolic-agent",
    desc: "A hybrid reasoning engine combining Large Language Models with PDDL-based planning.",
    tags: ["Python", "OpenAI", "LangGraph"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Multi-Agent Supply Chain Swarm",
    slug: "supply-chain-swarm",
    desc: "Autonomous agents orchestrating warehouse logistics and inventory management.",
    tags: ["CrewAI", "Redis", "Next.js"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Self-Healing Observability Hub",
    slug: "observability-hub",
    desc: "Real-time agent monitoring with automated failover and self-correction loops.",
    tags: ["LangSmith", "Elastic", "Django"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536ad37?auto=format&fit=crop&q=80&w=800",
  }
];

export default function ProjectsPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter cursor-default">
            SELECTED <span className="text-gradient">WORKS</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A showcase of production-ready Agentic AI systems and full-stack applications.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="group glass overflow-hidden flex flex-col glow-hover">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep to-transparent opacity-60" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono tracking-widest uppercase py-1 px-3 rounded-full border border-white/10 text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-light transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm font-bold group/link">
                    Explore Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex gap-4">
                    <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                    <ExternalLink className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
