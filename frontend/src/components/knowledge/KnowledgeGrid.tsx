import KnowledgeCard from './KnowledgeCard'

interface KnowledgeGridProps {
  domains: any[]
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
          icon={domain.icon}
          order={domain.order}
        />
      ))}
    </div>
  )
}
