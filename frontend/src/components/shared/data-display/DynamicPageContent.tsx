"use client";

import { useEffect, useState } from 'react';
import { CoreService, PageSection } from '@/services/core.service';
import { GenericSection } from '@/components/shared/data-display';

interface DynamicPageContentProps {
  page: string;
}

/**
 * DynamicPageContent automatically fetches and renders additional sections
 * defined in the backend for a specific page.
 */
export default function DynamicPageContent({ page }: DynamicPageContentProps) {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [sectionData, setSectionData] = useState<Record<number, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDynamicContent() {
      const { data: pageSections } = await CoreService.getPageSections(page);
      
      if (pageSections && pageSections.length > 0) {
        setSections(pageSections);
        
        // Fetch data for each section
        const dataMap: Record<number, unknown> = {};
        await Promise.all(pageSections.map(async (section) => {
          const { data } = await CoreService.getDynamicData(section.endpoint);
          if (data) {
            dataMap[section.id] = data;
          }
        }));
        
        setSectionData(dataMap);
      }
      setLoading(false);
    }

    loadDynamicContent();
  }, [page]);

  if (loading) return null; // Or a subtle loader
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <GenericSection 
          key={section.id}
          title={section.title}
          data={sectionData[section.id]}
          type={section.component_type}
        />
      ))}
    </>
  );
}
