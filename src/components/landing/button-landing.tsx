import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"

const ButtonLanding = ({
  text,
  url,
  icon,
  className,
}: {
  text: string
  url: string
  icon: React.JSX.Element
  className?: string
}) => {
  const router = useRouter()
  return (
    <div className="">
      <button
        onClick={() => router.push(url)}
        className={cn(
          "w-40 h-12 border-[1px] text-white font-normal rounded hover:bg-primary_dark_green/20 transition-all flex items-center justify-center flex-row",
          className
        )}
      >
        <span className="mr-2">{text}</span> {icon}
      </button>
    </div>
  )
}

export default ButtonLanding
