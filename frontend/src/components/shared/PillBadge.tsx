import React from 'react';

interface PillBadgeProps {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
  animate?: boolean;
}

export default function PillBadge({ 
  children, 
  className = "", 
  dotClassName = "", 
  animate = true 
}: PillBadgeProps) {
  return (
    <div className={`pill-badge w-fit ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-[var(--accent)] ${animate ? 'animate-pulse' : ''} ${dotClassName}`} />
      {children}
    </div>
  );
}
