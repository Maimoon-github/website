import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

interface ReadingTimeBadgeProps {
  time: string | number
  className?: string
}

export function ReadingTimeBadge({ time, className }: ReadingTimeBadgeProps) {
  const displayTime = typeof time === "number" ? `${time} min read` : time

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase", className)}>
      <Clock className="w-2.5 h-2.5" />
      <span>{displayTime}</span>
    </div>
  )
}
