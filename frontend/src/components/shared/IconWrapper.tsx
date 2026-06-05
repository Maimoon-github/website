import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
}

export default function IconWrapper({ children, size = "md" }: IconWrapperProps) {
  const sizeClasses = {
    md: "w-12 h-12 rounded-full p-2 bg-[var(--surface)]/50 border-2 border-[var(--accent)]/30",
    lg: "w-16 h-16 rounded-2xl p-3 bg-[var(--surface)]/50 border border-[var(--accent)]/30 shadow-[0_0_15px_rgba(139,101,191,0.1)]",
    xl: "w-24 h-24 rounded-2xl border-2 border-[var(--accent)]/20 shadow-2xl",
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center shrink-0 transition-all hover:border-[var(--accent)]/60 group-hover:scale-110`}>
      {children}
    </div>
  );
}
