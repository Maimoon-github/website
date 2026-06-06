import { Domain } from '@/services/knowledge.service';
import KnowledgeCard from './KnowledgeCard';

interface KnowledgeGridProps {
  domains: Domain[]
}

export default function KnowledgeGrid({ domains }: KnowledgeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {domains.map((domain) => (
        <KnowledgeCard
          key={domain.slug}
          title={domain.name}
          slug={domain.slug}
          description={domain.description}
          icon={domain.icon || 'Brain'}
          order={domain.order}
        />
      ))}
    </div>
  )
}
