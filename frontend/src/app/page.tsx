import { getHomeData } from '../lib/api';
import { getPosts } from '../lib/posts';
import { getProjects } from '../lib/projects';
import Link from 'next/link';

export default async function HomePage() {
  const [homeData, posts, projects] = await Promise.all([
    getHomeData(),
    getPosts(),
    getProjects()
  ]);

  const { hero, bio, journey } = homeData;
  const backendUrl = 'http://localhost:8000';

  // For the infinite scroll effect, we duplicate the items
  const techItems = hero?.tech_stack ? hero.tech_stack.split(',') : [
    'Models/APIs [via vLLM/Ollama]',
    'agent frameworks [LangGraph, CrewAI, AutoGen, Pydantic AI]',
    'MCP tool[context layer]',
    'memory & retrieval [Qdrant, Redis]',
    'orchestration [Celery]',
    'eval & observability [Langfuse]',
    'serving/infra [FastAPI, Docker, NixOS]',
    'guardrails [Guardrails AI]',
    'data/state [Postgres, Redis]'
  ];

  return (
    <main className="min-h-screen bg-[#131026] text-[#E5DEFE]">
      {/* 1. Hero Section - Deep Midnight Mode */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-[#1F1A40]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#8B65BF]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 z-10">
              <div className="pill-badge mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF] animate-pulse" />
                {hero?.system_status || "SYSTEM ARCHITECTURE READY"}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
                {hero?.title || "Agentic AI"} <br/>
                <span className="text-[#8B65BF] italic">{hero?.title_accent || "Engineer Architect"}</span>
              </h1>
              
              <p className="text-xl text-[#968E9C] font-medium leading-relaxed mb-12 max-w-2xl">
                {hero?.description || "AI Developer & Agentic Workflow Architect building autonomous systems that transform complex LLM orchestration into scalable, high-impact automation."}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link href="/projects" className="bg-[#8B65BF] text-[#131026] px-10 py-5 rounded-md font-black text-xs tracking-widest transition-all hover:scale-105 shadow-[0_0_40px_rgba(139,101,191,0.3)]">
                  {hero?.protocol_text || "INITIALIZE PROTOCOL"}
                </Link>
                <Link href="/contact" className="border border-[#8B65BF]/40 text-[#8B65BF] px-10 py-5 rounded-md font-black text-xs tracking-widest transition-all hover:bg-[#8B65BF]/10">
                  {hero?.architecture_text || "VIEW ARCHITECTURE"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-float">
              <div className="absolute -inset-4 bg-[#8B65BF]/20 blur-[60px] rounded-full opacity-50 animate-pulse-glow" />
              <div className="relative border-4 border-[#1F1A40] rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 ethereal-glow-lg">
                <img 
                  src="/image/hero image.jpeg" 
                  alt={hero?.title || "System Architecture"} 
                  className="w-full aspect-[4/3] object-cover" 
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Automatic Scrolling Tech Bar */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...techItems, ...techItems].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item.trim()}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bio & Journey - Mystical Black Lotus Theme */}
      <section className="bg-[#131026] text-[#E5DEFE] py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#5F2DA6]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-10 space-y-32 relative z-10">
          
          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-8">
               <div className="w-16 h-16 rounded-full border-2 border-[#8B65BF]/30 flex items-center justify-center p-3 bg-[#1F1A40]/50">
                  <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
               </div>
               <h2 className="text-5xl font-black font-display text-[#E5DEFE]">
                {bio?.title || "Bio"} <span className="font-light text-[#8B65BF]">{bio?.subtitle || "Info"}</span>
               </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#968E9C] max-w-4xl">
                {bio?.content || "Agentic AI Architect building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows. Stack: Python, LangChain, FastAPI, Next.js, Vector DBs. Focused on turning research into production-grade agents."}
              </p>
            </div>
          </div>

          {/* Journey Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-8">
               <div className="w-16 h-16 rounded-full border-2 border-[#8B65BF]/30 flex items-center justify-center p-3 bg-[#1F1A40]/50">
                  <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h2 className="text-5xl font-black font-display text-[#E5DEFE]">
                Journey <span className="font-light text-[#8B65BF]">Info</span>
               </h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {journey.length > 0 ? journey.map((phase) => (
                <div key={phase.phase_number} className="text-lg md:text-xl font-bold leading-snug p-6 rounded-xl border border-[#8B65BF]/10 bg-[#1F1A40]/30 hover:border-[#8B65BF]/40 transition-all">
                  <span className="font-black mr-2 text-[#8B65BF]">{phase.title} →</span>
                  <span className="text-[#E5DEFE] font-medium">{phase.subtitle} →</span>
                  <span className="text-[#968E9C] font-medium ml-1">{phase.description}</span>
                </div>
              )) : (
                <div className="text-[#8B65BF] animate-pulse font-mono tracking-widest uppercase text-sm">Sequence_Loading_Protocol...</div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Projects Section - High Fidelity Grid based on Image Analogy */}
      <section className="bg-[#131026] py-32 border-t border-[#8B65BF]/10">
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-6xl font-black font-display text-[#E5DEFE] mb-4">Project</h2>
              <div className="h-1 w-24 bg-[#8B65BF] rounded-full" />
            </div>
            <div className="text-right">
              <span className="text-[#8B65BF] font-mono text-xs uppercase tracking-[0.3em] block mb-2">Portfolio_Manifest</span>
              <h3 className="text-2xl font-bold text-[#968E9C]">See What Work I <br/> Generated</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#8B65BF]/10 border border-[#8B65BF]/20 rounded-2xl overflow-hidden">
            {projects.length > 0 ? projects.slice(0, 4).map((project) => (
              <div key={project.id} className="bg-[#131026] group relative overflow-hidden flex flex-col h-full">
                {/* Image Section (Top half of the box in sketch) */}
                <div className="aspect-square overflow-hidden relative border-b border-[#8B65BF]/10">
                  {project.cover_image ? (
                    <img 
                      src={project.cover_image.startsWith('http') ? project.cover_image : `${backendUrl}${project.cover_image}`} 
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

                {/* Project Information Section (Bottom half of the box in sketch) */}
                <div className="p-8 flex-grow flex flex-col justify-between bg-[#1F1A40]/10 group-hover:bg-[#1F1A40]/30 transition-all">
                  <div>
                    <h4 className="text-xl font-black text-[#E5DEFE] mb-3 group-hover:text-[#8B65BF] transition-colors">{project.title}</h4>
                    <p className="text-sm text-[#968E9C] line-clamp-3 leading-relaxed mb-6 font-medium">
                      {project.short_info || project.description}
                    </p>
                  </div>
                  
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest text-[#8B65BF] hover:text-[#E5DEFE] transition-colors">
                    <span>LAUNCH OPERATION</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            )) : Array.from({length: 4}).map((_, i) => (
              <div key={i} className="bg-[#131026] aspect-[4/5] animate-pulse flex flex-col">
                <div className="flex-grow bg-[#1F1A40]/50 m-4 rounded-lg" />
                <div className="h-4 w-1/2 bg-[#1F1A40]/50 mx-4 mb-2 rounded" />
                <div className="h-4 w-3/4 bg-[#1F1A40]/50 mx-4 mb-8 rounded" />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/projects" className="inline-block relative py-4 group">
               <span className="text-[11px] font-black tracking-[0.5em] text-[#8B65BF] group-hover:text-[#E5DEFE] transition-colors">VIEW ALL ARCHIVES</span>
               <div className="h-0.5 w-full bg-[#8B65BF] mt-2 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
