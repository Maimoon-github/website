"use client"

import {
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"
import { cn } from "@/lib/utils"

interface SocialShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function SocialShareButtons({ url, title, className }: SocialShareButtonsProps) {
  const iconSize = 40

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <TwitterShareButton url={url} title={title}>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent-purple/20 hover:scale-110 transition-all border border-white/5">
          <TwitterIcon size={24} bgStyle={{ fill: 'transparent' }}  />
        </div>
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title}>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent-purple/20 hover:scale-110 transition-all border border-white/5">
          <LinkedinIcon size={24} bgStyle={{ fill: 'transparent' }} />
        </div>
      </LinkedinShareButton>

      <EmailShareButton url={url} subject={title}>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent-purple/20 hover:scale-110 transition-all border border-white/5">
          <EmailIcon size={24} bgStyle={{ fill: 'transparent' }} />
        </div>
      </EmailShareButton>
    </div>
  )
}
