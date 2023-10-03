import { cn } from "@/lib/utils"
import React from "react"

const CardAside = ({
  title,
  description,
  icon,
  isBig,
}: {
  title: string
  description: string
  icon: React.JSX.Element
  isBig: boolean
}) => {
  return (
    <aside
      className={cn("w-1/2 h-full flex items-start justify-start", {
        "w-full h-full items-center justify-center": !isBig,
      })}
    >
      <div
        className={cn(
          "w-full h-full flex items-start justify-start text-justify",
          {
            "items-center justify-center text-center flex-col": !isBig,
          }
        )}
      >
        <div
          className={cn("m-8 flex gap-3 flex-col", {
            "justify-center items-center": !isBig,
          })}
        >
          <div className="w-12 h-12 bg-black/80 flex items-center justify-center rounded-md">
            {icon}
          </div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-text_gray/60 font-normal text-sm w-full">
            {description}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default CardAside
