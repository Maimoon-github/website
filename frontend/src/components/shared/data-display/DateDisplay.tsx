import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"

interface DateDisplayProps {
  date: string | Date
  className?: string
  showIcon?: boolean
}

export function DateDisplay({ date, className, showIcon = true }: DateDisplayProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })

  return (
    <div className={cn("inline-flex items-center gap-2 text-xs font-mono text-gray-500", className)}>
      {showIcon && <Calendar className="w-3 h-3" />}
      <span>{formattedDate}</span>
    </div>
  )
}
