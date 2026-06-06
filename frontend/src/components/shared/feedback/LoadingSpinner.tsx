import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Loader2 className={cn("text-accent-purple animate-spin", sizeClasses[size])} />
      {label && (
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">
          {label}
        </p>
      )}
    </div>
  )
}
