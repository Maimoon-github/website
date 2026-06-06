"use client"

import { FilterGroup, FilterDropdown } from "@/components/shared/forms"

const CATEGORY_OPTIONS = [
  { label: "Engineering", value: "engineering" },
  { label: "Research", value: "research" },
  { label: "Ethics", value: "ethics" },
]

export default function PostFilters() {
  return (
    <FilterGroup>
      <FilterDropdown
        label="Taxonomy"
        filterKey="category"
        options={CATEGORY_OPTIONS}
      />
    </FilterGroup>
  )
}
