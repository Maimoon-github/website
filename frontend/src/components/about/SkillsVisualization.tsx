"use client"
import { motion } from "framer-motion"
import { Skill } from "@/services/core.service";

interface SkillsVisualizationProps {
  skills: Skill[];
}

export default function SkillsVisualization({ skills }: SkillsVisualizationProps) {
  // Use provided skills or fallback to defaults if none provided
  const displaySkills = skills?.length > 0 ? skills : [
    { name: "Agentic Architectures", level: 95 },
    { name: "Autonomous Reasoning", level: 90 },
    { name: "Cognitive Security", level: 85 },
    { name: "Multi-Agent Systems", level: 92 },
    { name: "Full-Stack AI Engineering", level: 88 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold tracking-tight text-white mb-8">
        TECHNICAL <span className="text-gradient">CAPABILITIES</span>
      </h3>
      <div className="space-y-4">
        {displaySkills.map((skill, i) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-mono tracking-widest text-gray-400">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-accent-purple to-accent-light"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
