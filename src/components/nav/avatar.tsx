import { cn } from "@/lib/utils"
import React from "react"

const Avatar = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "w-11 h-11 bg-primary_dark_green/80 border-[1px] border-primary_light_green rounded-full text-white text-xl font-bold flex items-center justify-center cursor-pointer",
          className
        )}
      >
        T
      </div>
    </div>
  )
}

export default Avatar
