import { ReactNode } from "react";
import { KnowledgeService } from "@/services/knowledge.service";
import Link from "next/link";
import { Brain, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default async function KnowledgeLayout({ children }: { children: ReactNode }) {
  const { data: domains } = await KnowledgeService.getDomains();

  const domainList = (
    <div className="px-6 space-y-1">
      <div className="px-4 mb-4">
        <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Nexus_Index</h3>
        <div className="h-0.5 w-8 bg-accent-purple rounded-full" />
      </div>
      {domains?.map((domain) => {
        const Icon = (Icons[domain.icon as keyof typeof Icons] as React.ElementType) || Brain;
        return (
          <Link
            key={domain.slug}
            href={`/knowledge/${domain.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Icon className="w-3.5 h-3.5 group-hover:text-accent-light transition-colors" />
            <span className="text-xs font-medium tracking-tight truncate">{domain.name}</span>
            <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        );
      })}
    </div>
  );

  return (
    <SidebarLayout activeSection="knowledge" sidebarExtra={domainList}>
      {children}
    </SidebarLayout>
  );
}
