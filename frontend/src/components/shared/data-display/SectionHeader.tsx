import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  highlightedWord?: string
  description?: string
  align?: "left" | "center"
  className?: string
  children?: React.ReactNode
}

export function SectionHeader({
  badge,
  title,
  highlightedWord,
  description,
  align = "left",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-16 flex flex-col gap-8",
      align === "center" ? "items-center text-center" : "md:flex-row md:justify-between md:items-end",
      className
    )}>
      <header className={cn(
        align === "center" ? "text-center" : "text-left"
      )}>
        {badge && (
          <div className="text-accent-light font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
            {badge}
          </div>
        )}
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase cursor-default">
          {title} {highlightedWord && <span className="text-gradient">{highlightedWord}</span>}
        </h2>
        {description && (
          <p className={cn(
            "text-xl text-gray-400 max-w-2xl mt-4",
            align === "center" && "mx-auto"
          )}>
            {description}
          </p>
        )}
      </header>
      {children && (
        <div className="flex shrink-0">
          {children}
        </div>
      )}
    </div>
  )
}
