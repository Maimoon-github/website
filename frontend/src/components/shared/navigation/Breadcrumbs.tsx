"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  className?: string
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  if (pathname === "/") return null

  return (
    <nav className={cn("flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500", className)}>
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`
        const isLast = index === paths.length - 1
        const label = path.replace(/-/g, " ")

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
            {isLast ? (
              <span className="text-gray-300 font-bold">{label}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-accent-light transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
