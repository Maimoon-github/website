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
    <main className="flex-grow pt-16 bg-[#F2F2F2] dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">
      {/* 1. Hero Section - Compact & High-Impact */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-6">
              {hero?.title || "Agentic AI Engineer Architect"}
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">
              {hero?.description || "AI Developer & Agentic Workflow Architect building autonomous systems that transform complex LLM orchestration into scalable, high-impact automation."}
            </p>
            <div className="flex gap-4">
              <Link href="/projects" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-zinc-500/10">
                View Projects
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
            {hero?.hero_image ? (
              <img src={hero.hero_image} alt="Hero" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center grayscale opacity-50">
                 <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Tech Stack Bar - Grey Tone, Compact Labels */}
      <div className="w-full bg-[#E5E5E5] dark:bg-zinc-900/80 overflow-hidden py-3 border-y border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scollbar-hide">
          <div className="flex items-center gap-x-10 gap-y-2 text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
            {hero?.tech_stack ? hero.tech_stack.split(',').map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                {item.trim()}
              </span>
            )) : (
              <>
                <span>Models/APIs</span>
                <span>Agent Frameworks</span>
                <span>Context Layer</span>
                <span>Memory & Retrieval</span>
                <span>Orchestration</span>
                <span>Observability</span>
                <span>Serving/Infra</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bio & Journey info Section - Tighter Layout */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white dark:bg-transparent rounded-3xl my-12 border border-zinc-200 dark:border-transparent">
        <div className="space-y-24">
          {/* Bio info */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            <div className="flex items-center gap-4 lg:min-w-[280px]">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Bio <span className="text-zinc-400 font-medium">Info</span></h2>
            </div>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium lg:max-w-3xl">
              {bio?.content || "Agentic AI Architect building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows. Stack: Python, LangChain, FastAPI, Next.js, Vector DBs. Focused on turning research into production-grade agents."}
            </p>
          </div>

          {/* Journey info */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start pb-12">
            <div className="flex items-center gap-4 lg:min-w-[280px]">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                 <svg className="w-6 h-6 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Journey <span className="text-zinc-400 font-medium">Info</span></h2>
            </div>
            <div className="space-y-4 lg:max-w-3xl">
              {journey.length > 0 ? journey.map((phase) => (
                <div key={phase.phase_number} className="text-sm md:text-base group">
                  <span className="font-black text-indigo-600 dark:text-indigo-400">Phase {phase.phase_number} <span className="text-zinc-300 dark:text-zinc-800 mx-2">→</span></span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 mr-2">{phase.title} <span className="text-zinc-300 dark:text-zinc-800 mx-2">→</span></span>
                  <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">{phase.description}</span>
                </div>
              )) : (
                <p className="text-zinc-400 italic">Exploring the timeline of technical growth...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work - Grid of 2 for focus */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">Recent <span className="text-zinc-400 font-medium italic">Work</span></h2>
            <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Showcase</p>
          </div>
          <Link href="/projects" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All Projects</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
    </main>
  );
}
