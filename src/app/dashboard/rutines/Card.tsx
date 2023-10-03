import Link from "next/link"
import React from "react"
import CardContent from "./CardContent"

const Card = () => {
  const defaultRutines = [
    {
      name: "Cardio",
      description: "Rutina de cardio",
      icon: "ri-run-line",
    },
    {
      name: "Fuerza",
      description: "Rutina de fuerza",
      icon: "ri-boxing-fill",
    },
    {
      name: "Salud",
      description: "Rutina de saludable",
      icon: "ri-mental-health-fill",
    },
  ]

  return (
    <div className="w-full h-screen fixed bg-[#00000081] top-0 left-0 flex items-center justify-center z-20 bg-gradient-radial">
      <div className="w-[750px] h-[550px] border-[1px] border-text_gray/20 bg-[#13131a] rounded flex items-center justify-start flex-col">
        <h1 className="text-white text-4xl font-normal mt-12 mb-4">Rutinas</h1>
        <h2 className="text-white text-2xl font-normal">
          Todavia no tienes ninguna rutina
        </h2>
        <p className="text-gray-500 text-xl font-normal mt-4">
          Crea una{" "}
          <Link
            className="text-primary_green underline text-normal"
            href="/dashboard/rutines/create"
          >
            aqui
          </Link>
        </p>
        <div className="bg-white w-[80%] h-[1px] mt-9"></div>
        <div className="w-full h-full flex items-center justify-center flex-row">
          {defaultRutines.map(({ name, icon, description }, index) => {
            return <CardContent key={index} {...{ name, icon, description }} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
