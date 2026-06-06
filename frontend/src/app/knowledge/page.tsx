import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/knowledge/ArticleCard';
import { KnowledgeService } from '@/services/knowledge.service';
import { Bot, Map, GraduationCap } from 'lucide-react';
import { PageHeader } from '@/components/shared/data-display';

export const dynamic = 'force-dynamic';

export default async function KnowledgeHub() {
  const { data: domains, error } = await KnowledgeService.getDomains();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4">
          <PageHeader 
            badge="Cognitive Repository"
            title="THE"
            highlightedWord="KNOWLEDGE HUB"
            description="Structured documentation for the entire Agentic AI ecosystem. From single-agent loops to multi-agent swarms."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-8 glass bg-accent-purple/5 hover:bg-accent-purple/10 transition-colors border-white/5">
              <Bot className="w-10 h-10 text-accent-light mb-6" />
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">12 Core Domains</h3>
              <p className="text-sm text-gray-500 leading-relaxed">The fundamental building blocks of autonomous systems, from memory to tools.</p>
            </div>
            <div className="p-8 glass bg-accent-mid/5 hover:bg-accent-mid/10 transition-colors border-white/5">
              <Map className="w-10 h-10 text-accent-light mb-6" />
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Guided Paths</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Role-specific learning tracks for engineers, architects, and researchers.</p>
            </div>
            <div className="p-8 glass bg-accent-light/5 hover:bg-accent-light/10 transition-colors border-white/5">
              <GraduationCap className="w-10 h-10 text-accent-light mb-6" />
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Skill Matrix</h3>
              <p className="text-sm text-gray-500 leading-relaxed">From baseline concepts to production-grade deployment strategies.</p>
            </div>
          </div>

          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Domain <span className="text-accent-light">Explorer</span></h2>
              <div className="h-1 w-12 bg-accent-purple rounded-full" />
            </div>
          </div>

          {error ? (
            <div className="glass p-20 text-center rounded-3xl border border-red-500/20 bg-red-500/5">
              <p className="text-red-400 font-mono uppercase tracking-widest">{error}</p>
              <p className="text-gray-500 text-sm mt-4">Check node connectivity.</p>
            </div>
          ) : domains.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((domain) => (
                <ArticleCard
                  key={domain.slug}
                  title={domain.name}
                  slug={domain.slug}
                  description={domain.description}
                  icon={domain.icon}
                  order={domain.order}
                />
              ))}
            </div>
          ) : (
            <div className="glass p-20 text-center rounded-3xl border-dashed border-white/10">
              <p className="text-gray-500 font-mono uppercase tracking-widest">No domains indexed in collective memory.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
