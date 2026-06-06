interface StatsGridProps {
  profile: any
}

export default function StatsGrid({ profile }: StatsGridProps) {
  const stats = [
    { label: 'Domains', value: profile?.stats_domain_count || '12' },
    { label: 'Projects', value: profile?.stats_project_count || '25+' },
    { label: 'Experience', value: profile?.stats_experience_years || '5y+' },
    { label: 'Efficiency', value: '98%' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
      {stats.map((stat) => (
        <div key={stat.label} className="p-8 glass text-center group hover:border-accent-purple/50 transition-all">
          <div className="text-3xl font-black text-gradient mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
