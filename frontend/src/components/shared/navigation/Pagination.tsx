"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  totalPages: number
  currentPage: number
  className?: string
}

export function Pagination({ totalPages, currentPage, className }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-12", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="gap-1 px-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      <div className="flex items-center gap-1 mx-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                "w-10 h-10 rounded-xl font-mono text-sm transition-all",
                isActive
                  ? "bg-accent-purple text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              {page.toString().padStart(2, "0")}
            </button>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="gap-1 px-4"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
