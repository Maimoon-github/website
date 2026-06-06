"use client"

import { FilterGroup, FilterDropdown } from "@/components/shared/forms"

const DOMAIN_OPTIONS = [
  { label: "Cognitive Architecture", value: "cognitive-architecture" },
  { label: "Memory Systems", value: "memory-systems" },
  { label: "Tool Use", value: "tool-use" },
  { label: "Multi-Agent Systems", value: "multi-agent-systems" },
]

export default function KnowledgeFilters() {
  return (
    <FilterGroup>
      <FilterDropdown
        label="Domain"
        filterKey="domain"
        options={DOMAIN_OPTIONS}
      />
    </FilterGroup>
  )
}
