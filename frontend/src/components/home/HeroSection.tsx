"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, Cpu, Shield, Rocket, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { HomepageService, HeroContent, StatCounter } from '@/services/homepage.service';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Cpu,
  Shield,
  Rocket
};

export default function HeroSection() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [stats, setStats] = useState<StatCounter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [heroRes, statsRes] = await Promise.all([
        HomepageService.getHeroContent(),
        HomepageService.getStats()
      ]);
      if (heroRes.data) setHero(heroRes.data);
      if (statsRes.data) setStats(statsRes.data);
    };
    fetchData();
  }, []);

  const title = hero?.title || "Architecting Autonomous Intelligence";
  const tagline = hero?.tagline || "The Future of Agentic AI Engineering";
  const description = hero?.description || "A comprehensive knowledge hub and portfolio dedicated to production-grade Agentic AI systems. From cognitive architectures to multi-agent swarms.";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-mid/20 blur-[120px] animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-light mb-8 hover:bg-accent-purple/20 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase">{tagline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
        >
          {title.split(' ').map((word, i) => (
            word.toLowerCase() === 'autonomous' ? <span key={i} className="text-gradient"> {word} </span> : ` ${word} `
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href={hero?.primary_cta_link || "/knowledge"} 
            className="w-full sm:w-auto px-8 py-4 bg-accent-purple rounded-xl font-bold flex items-center justify-center gap-2 glow glow-hover transition-all"
          >
            {hero?.primary_cta_text || "Explore Domains"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href={hero?.secondary_cta_link || "/projects"} 
            className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/5 rounded-xl font-bold transition-all"
          >
            {hero?.secondary_cta_text || "View Projects"}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
          {(stats.length > 0 ? stats : [
            { label: 'AGENTIC', icon: 'Bot' },
            { label: 'COGNITIVE', icon: 'Cpu' },
            { label: 'GOVERNED', icon: 'Shield' },
            { label: 'PRODUCTION', icon: 'Rocket' }
          ]).map((stat, i) => {
            const Icon = iconMap[stat.icon] || Bot;
            return (
              <div key={i} className="flex items-center justify-center gap-2">
                <Icon className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll to Learn</span>
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent-purple to-transparent" />
      </motion.div>
    </section>
  );
}
