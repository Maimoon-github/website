"use client"

import { SearchBar } from "@/components/shared/forms"

export default function ProjectSearchBar() {
  return (
    <SearchBar 
      placeholder="Search projects..." 
      searchKey="q"
      className="max-w-md w-full"
    />
  )
}
