import React from 'react';

interface SectionHeaderProps {
  title: string;
  accentTitle?: string;
  subtitle?: string;
  pillText?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  accentTitle,
  subtitle,
  pillText,
  centered = false
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start'} mb-16`}>
      {pillText && (
        <div className="pill-badge mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          {pillText}
        </div>
      )}
      <h2 className="text-5xl md:text-7xl font-black font-display mb-6">
        {title} {accentTitle && <span className="text-[var(--accent)] font-light">{accentTitle}</span>}
      </h2>
      {subtitle && (
        <p className={`text-xl text-[var(--muted)] font-medium leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
