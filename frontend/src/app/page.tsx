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
    <main className="flex-grow pt-20 bg-[#F2F2F2] dark:bg-zinc-950">
      {/* 1. Hero Section - Matching Reference Image */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-black dark:text-white leading-[1.1] mb-8">
              {hero?.title || "Agentic AI Engineer Architect"}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-300 font-medium leading-relaxed max-w-xl">
              {hero?.description || "AI Developer & Agentic Workflow Architect building autonomous systems that transform complex LLM orchestration into scalable, high-impact automation."}
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
            {hero?.hero_image ? (
              <img src={hero.hero_image} alt="Hero" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                 <span className="text-zinc-400">Hero Image Placeholder</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Tech Stack Marquee / Simple Bar */}
      <div className="w-full bg-zinc-300 dark:bg-zinc-900 overflow-hidden py-4 border-y border-zinc-400 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          {hero?.tech_stack ? hero.tech_stack.split(',').map((item, i) => (
            <span key={i}>{item.trim()}</span>
          )) : (
            <>
              <span>Models/APIs (vLLM/Ollama)</span>
              <span>Agent Frameworks (LangGraph, CrewAI, AutoGen)</span>
              <span>MCP Tools/Context Layer</span>
              <span>Memory & Retrieval (Qdrant, Redis)</span>
              <span>Orchestration (Celery)</span>
              <span>Eval & Observability (Langfuse)</span>
              <span>Serving/Infra (FastAPI, Docker, NixOS)</span>
            </>
          )}
        </div>
      </div>

      {/* 3. Bio & Journey info Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-32">
          {/* Bio info */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex items-center gap-6 min-w-[300px]">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                 <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-4xl font-bold">Bio <span className="text-zinc-400">Info</span></h2>
            </div>
            <div className="text-lg text-zinc-700 dark:text-zinc-400 leading-relaxed font-medium">
              {bio?.content || "Agentic AI Architect building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows. Stack: Python, LangChain, FastAPI, Next.js, Vector DBs. Focused on turning research into production-grade agents."}
            </div>
          </div>

          {/* Journey info */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex items-center gap-6 min-w-[300px]">
              <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                 <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h2 className="text-4xl font-bold">Journey <span className="text-zinc-400">Info</span></h2>
            </div>
            <div className="space-y-4">
              {journey.length > 0 ? journey.map((phase) => (
                <div key={phase.phase_number} className="text-lg">
                  <span className="font-black">Phase {phase.phase_number} → </span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{phase.title} → </span>
                  <span className="text-zinc-600 dark:text-zinc-400">{phase.description}</span>
                </div>
              )) : (
                <div className="space-y-4 text-lg">
                  <div><span className="font-black">Phase 1 → </span><span className="font-bold">Self-Discovery & Reflection → </span>Built discipline + long-term vision.</div>
                  <div><span className="font-black">Phase 2 → </span><span className="font-bold">Technical Foundations → </span>Mastered programming, DSA, core CS.</div>
                  <div><span className="font-black">Phase 3 → </span><span className="font-bold">Engineering & System Design → </span>Architecting scalable software systems.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects & Blog sections follow... */}
      <section className="py-32 bg-white dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-4xl font-bold mb-16">Recent Work</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
             {projects.slice(0, 2).map((p) => <ProjectCard key={p.id} project={p} />)}
           </div>
        </div>
      </section>
    </main>
  );
}
