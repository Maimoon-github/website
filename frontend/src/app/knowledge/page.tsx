import { KnowledgeService } from '@/services/knowledge.service';
import { CoreService } from '@/services/core.service';
import { Bot, Map, GraduationCap } from 'lucide-react';
import { PageHeader, EmptyState } from '@/components/shared/data-display';
import { ErrorMessage } from '@/components/shared/feedback';
import Container from '@/components/layout/Container';
import { KnowledgeGrid } from '@/components/knowledge';

export const dynamic = 'force-dynamic';

export default async function KnowledgeHub() {
  const [
    { data: domains, error },
    { data: header }
  ] = await Promise.all([
    KnowledgeService.getDomains(),
    CoreService.getPageHeader('knowledge')
  ]);

  return (
    <Container className="pt-24 pb-20">
      <PageHeader 
        badge={header?.badge || "Cognitive Repository"}
        title={header?.title || "THE"}
        highlightedWord={header?.highlighted_word || "KNOWLEDGE HUB"}
        description={header?.description || "Structured documentation for the entire Agentic AI ecosystem. From single-agent loops to multi-agent swarms."}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 glass bg-accent-purple/5 hover:bg-accent-purple/10 transition-colors border-white/5">
          <Bot className="w-8 h-8 text-accent-light mb-4" />
          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">12 Core Domains</h3>
          <p className="text-sm text-gray-500 leading-relaxed">The fundamental building blocks of autonomous systems, from memory to tools.</p>
        </div>
        <div className="p-8 glass bg-accent-mid/5 hover:bg-accent-mid/10 transition-colors border-white/5">
          <Map className="w-8 h-8 text-accent-light mb-4" />
          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Guided Paths</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Role-specific learning tracks for engineers, architects, and researchers.</p>
        </div>
        <div className="p-8 glass bg-accent-light/5 hover:bg-accent-light/10 transition-colors border-white/5">
          <GraduationCap className="w-8 h-8 text-accent-light mb-4" />
          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Skill Matrix</h3>
          <p className="text-sm text-gray-500 leading-relaxed">From baseline concepts to production-grade deployment strategies.</p>
        </div>
      </div>

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Domain <span className="text-accent-light">Explorer</span></h2>
          <div className="h-1 w-12 bg-accent-purple rounded-full" />
        </div>
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : domains && domains.length > 0 ? (
        <KnowledgeGrid domains={domains} />
      ) : (
        <EmptyState 
          title="Memory Empty" 
          description="No knowledge domains have been indexed in the collective memory yet."
        />
      )}
    </Container>
  );
}
