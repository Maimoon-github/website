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
      "mb-20",
      align === "center" ? "text-center md:text-center" : "text-center lg:text-left",
      className
    )}>
      {showBreadcrumbs && (
        <Breadcrumbs className={cn(
          "mb-12",
          align === "center" ? "justify-center" : "justify-center lg:justify-start"
        )} />
      )}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-light mb-6">
          {badge}
        </div>
      )}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter cursor-default uppercase">
        {title} {highlightedWord && <span className="text-gradient">{highlightedWord}</span>}
      </h1>
      {description && (
        <p className={cn(
          "text-xl text-gray-400 max-w-2xl",
          align === "center" ? "mx-auto" : "lg:mx-0 mx-auto"
        )}>
          {description}
        </p>
      )}
    </header>
  )
}
