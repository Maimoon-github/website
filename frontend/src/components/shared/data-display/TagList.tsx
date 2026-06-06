import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

interface TagListProps {
  tags: string[]
  className?: string
  limit?: number
}

export function TagList({ tags, className, limit }: TagListProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayTags.map((tag) => (
        <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-[10px] font-mono text-gray-400 py-0 px-2 uppercase tracking-tight">
          {tag}
        </Badge>
      ))}
      {limit && tags.length > limit && (
        <span className="text-[10px] font-mono text-gray-600 self-center">
          +{tags.length - limit}
        </span>
      )}
    </div>
  )
}
