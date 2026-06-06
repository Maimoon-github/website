import { cn } from "@/lib/utils"
import { Database, Search } from "lucide-react"

interface EmptyStateProps {
  icon?: "search" | "database"
  title?: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  icon = "database",
  title = "No Data Found",
  description = "The requested information is currently unavailable in this sector.",
  className,
  children,
}: EmptyStateProps) {
  const Icon = icon === "search" ? Search : Database

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-20 text-center glass border-dashed border-white/10 rounded-3xl",
      className
    )}>
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mb-8">{description}</p>
      {children}
    </div>
  )
}
