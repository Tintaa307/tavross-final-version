import React from "react"
import Avatar from "../nav/avatar"
import { cn } from "@/lib/utils"

const RutinesContent = () => {
  const exampleRutines = [
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Chest day 😁",
      frequency: "2 per week",
    },
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Back day 😁",
      frequency: "2 per week",
    },
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Leg day 😔",
      frequency: "2 per week",
    },
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Arm day 😁",
      frequency: "1 per week",
    },
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Arm day 😁",
      frequency: "1 per week",
    },
    {
      avatar: <Avatar className="w-8 h-8 text-lg" />,
      title: "Arm day 😁",
      frequency: "1 per week",
    },
  ]
  return (
    <div className="w-full h-full grid grid-cols-2 gap-x-8 overflow-hidden place-items-center">
      {exampleRutines.map((rutine, index) => (
        <div
          key={index}
          className={cn(
            "w-[120px] h-16 bg-transparent border-[1px] border-text_gray/40 flex items-center justify-start flex-row rounded-lg"
          )}
        >
          {/* <div className="mx-3">{rutine.avatar}</div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-white">{rutine.title}</h2>
            <small className="text-text_gray">{rutine.frequency}</small>
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default RutinesContent
