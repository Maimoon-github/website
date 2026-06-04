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

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-[#8B65BF]/20 blur-[60px] rounded-full opacity-50" />
              <div className="relative border-4 border-[#1F1A40] rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                {hero?.hero_image ? (
                  <img 
                    src={hero.hero_image.startsWith('http') ? hero.hero_image : `${backendUrl}${hero.hero_image}`} 
                    alt="System Architecture" 
                    className="w-full aspect-[4/3] object-cover" 
                  />
                ) : (
                  <div className="aspect-[4/3] bg-[#1c192f] flex items-center justify-center">
                    <span className="text-[#8B65BF] font-mono text-xs uppercase tracking-widest opacity-40">System_Module_Empty</span>
                  </div>
                )}
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

      {/* 3. Bio & Journey - Contrasting Light Mode as per Image */}
      <section className="bg-[#EBEBEB] text-[#131026] py-32">
        <div className="max-w-[1440px] mx-auto px-10 space-y-32">
          
          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-8">
               <div className="w-16 h-16 rounded-full border-2 border-zinc-300 flex items-center justify-center p-3">
                  <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
               </div>
               <h2 className="text-5xl font-black font-display">
                {bio?.title || "Bio"} <span className="font-light text-zinc-400">{bio?.subtitle || "Info"}</span>
               </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-600 max-w-4xl">
                {bio?.content || "Agentic AI Architect building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows. Stack: Python, LangChain, FastAPI, Next.js, Vector DBs. Focused on turning research into production-grade agents."}
              </p>
            </div>
          </div>

          {/* Journey Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-8">
               <div className="w-16 h-16 rounded-full border-2 border-zinc-300 flex items-center justify-center p-3">
                  <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h2 className="text-5xl font-black font-display">
                Journey <span className="font-light text-zinc-400">Info</span>
               </h2>
            </div>
            <div className="lg:col-span-8 space-y-2">
              {journey.length > 0 ? journey.map((phase) => (
                <div key={phase.phase_number} className="text-lg md:text-xl font-bold leading-snug">
                  <span className="font-black mr-2">Phase {phase.phase_number} →</span>
                  <span className="text-zinc-500 font-medium">{phase.subtitle} →</span>
                  <span className="text-zinc-600 font-medium ml-1">{phase.description}</span>
                </div>
              )) : (
                <div className="text-zinc-400 animate-pulse font-mono tracking-widest uppercase text-sm">Sequence_Loading_Protocol...</div>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
