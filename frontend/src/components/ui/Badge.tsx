import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-purple/10 text-accent-light hover:bg-accent-purple/20",
        secondary:
          "border-transparent bg-accent-mid/20 text-accent-light hover:bg-accent-mid/30",
        destructive:
          "border-transparent bg-red-500/10 text-red-400 hover:bg-red-500/20",
        outline: "text-white border-white/20 hover:border-accent-light/40 hover:text-accent-light",
        glow: "border-accent-purple/50 bg-accent-purple/20 text-white shadow-[0_0_10px_rgba(95,45,166,0.3)] hover:shadow-[0_0_15px_rgba(95,45,166,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
