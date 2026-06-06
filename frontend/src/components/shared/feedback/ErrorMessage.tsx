import { cn } from "@/lib/utils"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  title = "System Fault",
  message = "A critical error occurred while synchronizing data.",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center glass border-red-500/20 bg-red-500/5 rounded-3xl",
      className
    )}>
      <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm max-w-md mb-8">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 border-red-500/20 hover:bg-red-500/10"
        >
          <RefreshCcw className="w-4 h-4" />
          Attempt Re-Link
        </Button>
      )}
    </div>
  )
}
