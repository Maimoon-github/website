"use client"

import { FilterGroup, FilterDropdown } from "@/components/shared/forms"

const CATEGORY_OPTIONS = [
  { label: "Systems", value: "systems" },
  { label: "Agents", value: "agents" },
  { label: "Tools", value: "tools" },
]

const TECH_OPTIONS = [
  { label: "Python", value: "python" },
  { label: "TypeScript", value: "typescript" },
  { label: "PostgreSQL", value: "postgresql" },
]

export default function ProjectFilters() {
  return (
    <FilterGroup>
      <FilterDropdown
        label="Domain"
        filterKey="category"
        options={CATEGORY_OPTIONS}
      />
      <FilterDropdown
        label="Stack"
        filterKey="tech"
        options={TECH_OPTIONS}
      />
    </FilterGroup>
  )
}
