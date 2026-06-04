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

  return (
    <main className="min-h-screen bg-[#F2F2F2]">
      {/* 1. Hero Section - Focused & Clear */}
      <section className="pt-12 pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-block px-3 py-1 bg-[#8B65BF]/10 text-[#8B65BF] text-[10px] font-black tracking-widest uppercase rounded-full mb-6">
                {hero?.system_status || "SYSTEM READY"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#131026] mb-6">
                {hero?.title || "Agentic AI"} <br/>
                <span className="text-[#8B65BF]">{hero?.title_accent || "Engineer Architect"}</span>
              </h1>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-10 max-w-lg">
                {hero?.description || "Building autonomous systems that transform complex LLM orchestration into scalable automation."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="bg-[#131026] text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-[#8B65BF] shadow-lg shadow-black/10">
                  See My Work
                </Link>
                <Link href="/contact" className="bg-white border border-zinc-200 text-[#131026] px-8 py-4 rounded-xl font-bold transition-all hover:border-[#8B65BF] hover:text-[#8B65BF]">
                  Get In Touch
                </Link>
              </div>
            </div>

            <div className="relative group lg:block hidden">
              <div className="absolute -inset-4 bg-[#8B65BF]/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-2xl">
                {hero?.hero_image ? (
                  <img 
                    src={hero.hero_image.startsWith('http') ? hero.hero_image : `http://localhost:8000${hero.hero_image}`} 
                    alt="Hero" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Simplified Tech Bar */}
      <div className="bg-white border-y border-zinc-200 py-6">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            {hero?.tech_stack ? hero.tech_stack.split(',').map((item, i) => (
              <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em]">{item.trim()}</span>
            )) : (
              ['FastAPI', 'Next.js', 'PyTorch', 'Docker', 'Redis'].map(item => (
                <span key={item} className="text-[10px] font-black uppercase tracking-[0.2em]">{item}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. Logic & Story - More Readable */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Bio info */}
          <div className="lg:col-span-5">
            <span className="text-[10px] font-black text-[#8B65BF] uppercase tracking-widest block mb-4">Discovery</span>
            <h2 className="text-3xl font-black mb-6">The Bio <span className="text-zinc-300">Info</span></h2>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              {bio?.content || "Building autonomous, tool-using AI systems. Designs LLM agents with memory, planning & function calling for real-world workflows."}
            </p>
          </div>

          {/* Journey info */}
          <div className="lg:col-span-7">
            <span className="text-[10px] font-black text-[#8B65BF] uppercase tracking-widest block mb-4">Evolution</span>
            <h2 className="text-3xl font-black mb-8">Journey <span className="text-zinc-300">Timeline</span></h2>
            <div className="space-y-4">
              {journey.map((phase) => (
                <div key={phase.phase_number} className="group p-6 bg-white border border-zinc-200 rounded-2xl hover:border-[#8B65BF] transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-[#8B65BF]">P{phase.phase_number}</span>
                    <h3 className="text-lg font-bold group-hover:text-[#8B65BF] transition-colors">{phase.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 mt-2 pl-9">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
