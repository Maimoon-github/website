import { cn } from "@/lib/utils"
import { Breadcrumbs } from "../navigation"

interface PageHeaderProps {
  badge?: string
  title: string
  highlightedWord?: string
  description?: string
  align?: "left" | "center"
  className?: string
  showBreadcrumbs?: boolean
}

export function PageHeader({
  badge,
  title,
  highlightedWord,
  description,
  align = "left",
  className,
  showBreadcrumbs = true,
}: PageHeaderProps) {
  return (
    <header className={cn(
      "mb-12",
      align === "center" ? "text-center md:text-center" : "text-center lg:text-left",
      className
    )}>
      {showBreadcrumbs && (
        <Breadcrumbs className={cn(
          "mb-8",
          align === "center" ? "justify-center" : "justify-center lg:justify-start"
        )} />
      )}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-light mb-4">
          {badge}
        </div>
      )}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter cursor-default uppercase">
        {title} {highlightedWord && <span className="text-gradient">{highlightedWord}</span>}
      </h1>
      {description && (
        <p className={cn(
          "text-lg text-gray-400 max-w-2xl",
          align === "center" ? "mx-auto" : "lg:mx-0 mx-auto"
        )}>
          {description}
        </p>
      )}
    </header>
  )
}
