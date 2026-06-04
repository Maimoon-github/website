import { getHomeData } from '../lib/api';
import { getPosts } from '../lib/posts';
import { getProjects } from '../lib/projects';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';

export default async function HomePage() {
  const [homeData, posts, projects] = await Promise.all([
    getHomeData(),
    getPosts(),
    getProjects()
  ]);

  const { hero, bio, journey } = homeData;

  return (
    <main className="flex-grow pt-16 bg-[#131026] text-[#e5defe] selection:bg-[#8B65BF]/30 selection:text-white">
      {/* 1. Hero Section - Mimicking 'Stitch' screen.png */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* System Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F1A40]/50 border border-[#8B65BF]/30 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF] animate-pulse shadow-[0_0_8px_#8B65BF]" />
              <span className="text-[10px] uppercase tracking-[0.15em] font-black text-[#8B65BF] font-mono">
                {hero?.system_status || "SYSTEM ARCHITECTURE READY"}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-8 font-display">
              {hero?.title || "Agentic AI"} <br />
              <span className="text-[#8B65BF] italic">{hero?.title_accent || "Engineer Architect"}</span>
            </h1>

            <p className="text-lg md:text-xl text-[#ccc3d2] font-medium leading-relaxed max-w-xl mb-12">
              {hero?.description || "AI Developer & Agentic Workflow Architect building autonomous systems that transform complex LLM orchestration into scalable, high-impact automation."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href={hero?.protocol_link || "/contact"}
                className="bg-[#8B65BF] hover:bg-[#a57edb] text-[#131026] px-10 py-4 rounded-md font-black text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(139,101,191,0.3)]"
              >
                {hero?.protocol_text || "INITIALIZE PROTOCOL"}
              </Link>
              <Link 
                href={hero?.architecture_link || "/projects"}
                className="bg-transparent border border-[#8B65BF]/40 hover:border-[#8B65BF] text-[#8B65BF] px-10 py-4 rounded-md font-black text-xs tracking-widest transition-all hover:bg-[#8B65BF]/5"
              >
                {hero?.architecture_text || "VIEW ARCHITECTURE"}
              </Link>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Aesthetic Glow Orb behind image */}
            <div className="absolute -inset-10 bg-[#8B65BF]/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
            
            <div className="relative border-4 border-[#1F1A40] rounded-2xl overflow-hidden shadow-2xl scale-95 hover:scale-100 transition-transform duration-700">
              {hero?.hero_image ? (
                <img src={hero.hero_image} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="aspect-[16/10] bg-[#1c192f] flex items-center justify-center">
                   <div className="text-center p-8 border border-dashed border-[#3a364e] rounded-xl">
                      <p className="text-[#8B65BF] font-mono text-sm mb-2">&gt; ASSET_MISSING</p>
                      <p className="text-[10px] text-[#968e9c] uppercase tracking-widest">Awaiting visual synchronization</p>
                   </div>
                </div>
              )}
              {/* Inner Glow Overlay */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tech Stack Bar - Void Surface with Glass effect */}
      <div className="relative z-20 w-full bg-[#1F1A40]/90 backdrop-blur-md border-y border-[#3a364e] overflow-hidden py-4">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-x-12 gap-y-2 text-[10px] uppercase tracking-[0.2em] font-black text-[#968e9c] whitespace-nowrap overflow-x-auto no-scrollbar font-mono">
            {hero?.tech_stack ? hero.tech_stack.split(',').map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B65BF]/40" />
                {item.trim()}
              </span>
            )) : (
              <>
                <span>LLM/Ollama</span>
                <span>LangGraph</span>
                <span>CrewAI</span>
                <span>MCP Context</span>
                <span>Qdrant</span>
                <span>FastAPI/NixOS</span>
                <span>Guardrails</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bio & Journey Sections - Balanced Atmospheric Layout */}
      <section className="py-32 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-12 space-y-32">
            {/* Bio info */}
            <div className="flex flex-col md:flex-row gap-12 items-start text-justify">
              <div className="flex items-center gap-6 min-w-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1F1A40] border border-[#8B65BF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(139,101,191,0.1)]">
                   <svg className="w-8 h-8 text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight font-display">Bio <span className="text-[#968e9c] font-light">Info</span></h2>
              </div>
              <p className="text-xl text-[#ccc3d2] leading-relaxed max-w-4xl font-body">
                {bio?.content || "Agentic AI Architect building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows."}
              </p>
            </div>

            {/* Journey info */}
            <div className="flex flex-col md:flex-row gap-12 items-start text-justify">
              <div className="flex items-center gap-6 min-w-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1F1A40] border border-[#8B65BF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(139,101,191,0.1)]">
                   <svg className="w-8 h-8 text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight font-display">Journey <span className="text-[#968e9c] font-light">Info</span></h2>
              </div>
              <div className="space-y-6">
                {journey.length > 0 ? journey.map((phase) => (
                  <div key={phase.phase_number} className="text-lg leading-relaxed border-l-2 border-[#1F1A40] pl-8 hover:border-[#8B65BF]/50 transition-colors font-body">
                    <span className="font-black text-[#8B65BF] uppercase text-sm tracking-widest block mb-1 font-mono">Phase {phase.phase_number}</span>
                    <span className="font-bold text-white mr-2">{phase.title}</span>
                    <span className="text-[#968e9c] block mt-1">{phase.description}</span>
                  </div>
                )) : (
                  <p className="text-[#968e9c] italic font-body">Timeline in progress...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
