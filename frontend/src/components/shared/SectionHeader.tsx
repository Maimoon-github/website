import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ title, subtitle, badge, align = "left" }: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {badge && (
        <div className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4">
          {badge}
        </div>
      )}
      <h2 className="text-5xl md:text-7xl font-black font-display mb-6">
        {title.split(" ")[0]}{" "}
        <span className="text-[var(--accent)] font-light">
          {title.split(" ").slice(1).join(" ")}
        </span>
      </h2>
      {subtitle && (
        <p className={`text-xl text-[#968E9C] font-medium leading-relaxed max-w-2xl ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
