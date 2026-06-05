import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true
}: GlassCardProps) {
  return (
    <div className={`glass-morphism rounded-2xl p-8 ${hoverEffect ? 'hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]/50' : ''} ${className}`}>
      {children}
    </div>
  );
}
