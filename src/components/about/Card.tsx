import { cn } from "@/lib/utils"
import React from "react"
import CardAside from "./CardAside"
import ProgressContent from "../about-cards-content/progress-content"
import RutinesContent from "../about-cards-content/rutines-content"
import ModelsContent from "../about-cards-content/models-content"

const Card = ({
  index,
  title,
  icon,
  description,
  width,
  height,
  isBig,
}: {
  index: number
  title: string
  icon: React.JSX.Element
  description: string
  width: string
  height: string
  isBig: boolean
}) => {
  return (
    <div
      className={cn(
        "bg-[#1b1b22]/70 border-[1px] border-text_gray/20 rounded-md m-4 cursor-pointer hover:border-white/70 transition-colors duration-200 flex items-start justify-start flex-row backdrop-blur-md ",
        {
          "items-center justify-center flex-col": !isBig,
        },
        width,
        height
      )}
    >
      <CardAside
        title={title}
        description={description}
        icon={icon}
        isBig={isBig}
      />
      {index === 0 && <ModelsContent />}
      {index === 1 && <RutinesContent />}
      {index === 3 && <ProgressContent />}
    </div>
  )
}

export default Card
