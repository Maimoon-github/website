'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { getHomeHero, HeroSection } from "@/lib/api";

export default function Home() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeHero()
      .then((data) => {
        if (data.length > 0) {
          setHero(data[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {hero?.background_image && (
          <Image
            className="rounded-lg mb-8"
            src={hero.background_image}
            alt="Hero Background"
            width={600}
            height={300}
          />
        )}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {hero?.title || "To get started, edit the page.tsx file."}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {hero?.subtitle || "Looking for a starting point or more instructions?"}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          {hero?.cta_primary_text && (
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-white px-5 transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] md:w-[158px]"
              href={hero.cta_primary_link}
            >
              {hero.cta_primary_text}
            </a>
          )}
          {hero?.cta_secondary_text && (
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href={hero.cta_secondary_link}
            >
              {hero.cta_secondary_text}
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
