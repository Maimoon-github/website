"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface NavItem {
  name: string
  href: string
  icon: LucideIcon
  desc: string
}

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  navItems: NavItem[]
}

export default function MobileMenu({ isOpen, setIsOpen, navItems }: MobileMenuProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-80 bg-bg-deep border-l border-white/5 z-50 p-8 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-mono text-accent-light tracking-widest uppercase">System Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 glass rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group block p-4 glass rounded-2xl hover:bg-accent-purple/10 border-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-accent-light" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-accent-light group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <Button className="w-full" variant="primary">
                Access Core Entry
              </Button>
              <p className="mt-6 text-center text-xs text-gray-500 font-mono">NODE: ANTIGRAVITY_V2.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  )
}
