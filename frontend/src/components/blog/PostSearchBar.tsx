"use client"

import { SearchBar } from "@/components/shared/forms"

export default function PostSearchBar() {
  return (
    <SearchBar 
      placeholder="Search articles..." 
      searchKey="q"
      className="max-w-md w-full"
    />
  )
}
