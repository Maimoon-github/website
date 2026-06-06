import Hero from '@/components/home/Hero';
import DomainExplorer from '@/components/home/DomainExplorer';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DomainExplorer />
      
      {/* Featured Section */}
      <section className="py-24 bg-bg-dark/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="p-12 glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-9xl font-black italic">DRIVEN</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">Building at the Edge of <span className="text-gradient">Reasoning</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 text-lg">
              Explore my latest projects where AI agents handle real-world complexity, from autonomous coding assistants to distributed multi-agent systems.
            </p>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-3 rounded-full border border-white/10 text-sm font-mono tracking-widest">NEXT.JS 14</div>
              <div className="px-6 py-3 rounded-full border border-white/10 text-sm font-mono tracking-widest">DJANGO 5</div>
              <div className="px-6 py-3 rounded-full border border-white/10 text-sm font-mono tracking-widest">LANGGRAPH</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
