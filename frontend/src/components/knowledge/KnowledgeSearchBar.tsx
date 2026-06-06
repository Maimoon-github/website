"use client"

import { SearchBar } from "@/components/shared/forms"

export default function KnowledgeSearchBar() {
  return (
    <SearchBar 
      placeholder="Search knowledge..." 
      searchKey="q"
      className="max-w-md w-full"
    />
  )
}
