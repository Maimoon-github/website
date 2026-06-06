"use client"

import { Check, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FilterOption {
  label: string
  value: string
}

interface FilterDropdownProps {
  label: string
  filterKey: string
  options: FilterOption[]
}

export default function FilterDropdown({
  label,
  filterKey,
  options,
}: FilterDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const activeValue = searchParams.get(filterKey)

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === activeValue) {
      params.delete(filterKey)
    } else {
      params.set(filterKey, value)
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  const activeOption = options.find((opt) => opt.value === activeValue)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <span className="mr-2 text-gray-400">{label}:</span>
          {activeOption ? (
            <Badge variant="secondary" className="bg-accent-purple/20 text-accent-light border-0">
              {activeOption.label}
            </Badge>
          ) : (
            "All"
          )}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass border-white/10">
        <DropdownMenuItem
          onClick={() => handleSelect("")}
          className="flex items-center justify-between cursor-pointer"
        >
          All
          {!activeValue && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            {option.label}
            {activeValue === option.value && <Check className="h-4 w-4 text-accent-light" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
