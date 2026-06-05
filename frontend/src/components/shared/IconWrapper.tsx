import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function IconWrapper({ children, className = "" }: IconWrapperProps) {
  return (
    <div className={`w-16 h-16 rounded-2xl border border-[var(--accent)]/30 bg-[var(--void)] flex items-center justify-center shadow-[0_0_15px_rgba(139,101,191,0.1)] group-hover:scale-110 transition-transform ${className}`}>
      {children}
    </div>
  );
}
