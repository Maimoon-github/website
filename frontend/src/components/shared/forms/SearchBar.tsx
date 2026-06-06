"use client"

import { Search, X } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder?: string
  searchKey?: string
  className?: string
}

export default function SearchBar({
  placeholder = "Search...",
  searchKey = "q",
  className,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get(searchKey) || "")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(searchKey, value)
      } else {
        params.delete(searchKey)
      }

      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false })
      })
    }, 300)

    return () => clearTimeout(timeout)
  }, [value, searchKey, router, searchParams])

  return (
    <div className={`relative ${className}`}>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isPending ? 'animate-pulse text-accent-light' : ''}`} />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9 bg-white/5 border-white/10"
      />
      {value && !isPending && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
           <div className="w-3 h-3 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
