import { cn } from "@/lib/utils"

interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function FilterGroup({
  children,
  className,
  ...props
}: FilterGroupProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}
