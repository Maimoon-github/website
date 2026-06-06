import Navbar from '@/components/layout/Navbar';
import DomainExplorer from '@/components/home/DomainExplorer';
import { Bot, Map, GraduationCap } from 'lucide-react';

export default function KnowledgeHub() {
  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">THE <span className="text-gradient">KNOWLEDGE</span> HUB</h1>
              <p className="text-xl text-gray-400">Structured documentation for the entire Agentic AI ecosystem.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="p-8 glass bg-accent-purple/5 hover:bg-accent-purple/10 transition-colors">
                <Bot className="w-10 h-10 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">12 Core Domains</h3>
                <p className="text-sm text-gray-500">From single-agent PRA loops to complex multi-agent swarms.</p>
              </div>
              <div className="p-8 glass bg-accent-mid/5 hover:bg-accent-mid/10 transition-colors">
                <Map className="w-10 h-10 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Guided Paths</h3>
                <p className="text-sm text-gray-500">Role-based journeys for Engineers, Architects, and Researchers.</p>
              </div>
              <div className="p-8 glass bg-accent-light/5 hover:bg-accent-light/10 transition-colors">
                <GraduationCap className="w-10 h-10 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Skill Levels</h3>
                <p className="text-sm text-gray-500">Foundational concepts to production-grade implementations.</p>
              </div>
            </div>

            <DomainExplorer />
          </div>
        </div>
      </section>
    </main>
  );
}
