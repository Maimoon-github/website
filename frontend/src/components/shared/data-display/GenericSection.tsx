"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GenericSectionProps {
  title?: string;
  data: any | any[];
  type?: string;
}

/**
 * GenericSection dynamically renders data when a dedicated component is missing.
 * It detects common data patterns and uses appropriate UI elements.
 */
export default function GenericSection({ title, data, type }: GenericSectionProps) {
  if (!data) return null;

  const renderItem = (item: any, index: number) => {
    const properties = Object.entries(item).filter(([key]) => !['id', 'order', 'created_at', 'updated_at'].includes(key));
    
    return (
      <Card key={index} className="glass border-white/5 overflow-hidden hover:border-accent-purple/30 transition-all">
        <CardContent className="p-6">
          {properties.map(([key, value]) => {
            // Handle Images
            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/media/')) && (value.match(/\.(jpeg|jpg|gif|png|webp)$/) || key.includes('image'))) {
              return (
                <div key={key} className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <Image src={value} alt={key} fill className="object-cover" />
                </div>
              );
            }

            // Handle Arrays (Lists/Tags)
            if (Array.isArray(value)) {
              return (
                <div key={key} className="flex flex-wrap gap-2 mb-4">
                  {value.map((v, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px] uppercase font-mono">
                      {String(v)}
                    </Badge>
                  ))}
                </div>
              );
            }

            // Handle Objects (Recursive or nested data)
            if (typeof value === 'object' && value !== null) {
              return null; // Skip complex nested for now or list keys
            }

            // Handle Booleans
            if (typeof value === 'boolean') {
              if (!value) return null;
              return (
                <Badge key={key} className="bg-green-500/20 text-green-400 mb-2">
                  {key.replace(/_/g, ' ').toUpperCase()}
                </Badge>
              );
            }

            // Handle Text/Strings
            const label = key.replace(/_/g, ' ').toUpperCase();
            if (key.includes('title') || key === 'name') {
               return <h3 key={key} className="text-xl font-bold mb-2 text-white">{String(value)}</h3>;
            }

            return (
              <div key={key} className="mb-3">
                <span className="text-[10px] font-mono text-gray-500 block mb-1 tracking-widest">{label}</span>
                <p className="text-sm text-gray-300 leading-relaxed">{String(value)}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  const isList = Array.isArray(data);

  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom duration-1000">
      {title && (
        <div className="mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
            {title} <span className="text-accent-light">ENTRY</span>
          </h2>
          <div className="h-1 w-12 bg-accent-purple rounded-full mt-2" />
        </div>
      )}
      
      <div className={isList ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "max-w-4xl"}>
        {isList ? data.map((item, i) => renderItem(item, i)) : renderItem(data, 0)}
      </div>
    </section>
  );
}
