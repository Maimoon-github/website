"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"))
    const tocItems: TOCItem[] = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }))
    
    // Defer setting items to avoid cascading renders warning
    const timeoutId = setTimeout(() => {
      setItems(tocItems)
    }, 0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  if (items.length === 0) return null

  return (
    <nav className="space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-widest text-accent-light">
        Table of Contents
      </h4>
      <ul className="space-y-2 text-sm text-gray-400">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "transition-colors hover:text-white",
              item.level === 3 && "pl-4",
              activeId === item.id && "text-accent-light font-medium"
            )}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
