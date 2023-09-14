import Link from "next/link"
import React from "react"

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
    <div className="w-full h-screen fixed bg-[#00000081] top-0 left-0 flex items-center justify-center">
      <div className="w-[750px] h-[550px] bg-[#13131a] rounded flex items-center justify-start flex-col">
        <h1 className="text-white text-4xl font-normal mt-12 mb-4">Rutinas</h1>
        <h2 className="text-white text-2xl font-normal">
          Todavia no tienes ninguna rutina
        </h2>
        <p className="text-gray-500 text-xl font-normal mt-4">
          Crea una{" "}
          <Link
            className="text-blue-600 underline text-normal"
            href="/dashboard/rutines/create"
          >
            aqui
          </Link>
        </p>
        <h6 className="text-white text-lg my-7">
          wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        </h6>
        <div className="w-full h-full flex items-center justify-center flex-row">
          {defaultRutines.map((rutine, index) => {
            return (
              <div
                key={index}
                className="w-1/4 h-[250px] rounded-md border-2 border-white flex items-center flex-col justify-center mx-3 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <i
                    className={[rutine.icon, "text-white text-3xl"].join(" ")}
                  />
                </div>
                <h2 className="text-white font-semibold text-xl">
                  {rutine.name}
                </h2>
                <p className="text-gray-400 text-normal text-base">
                  {rutine.description}
                </p>
                <button className="w-3/4 h-10 text-white font-semibold rounded-md bg-blue-600 flex items-center justify-center outline-none hover:bg-blue-800 transition-colors duration-200">
                  Agregar
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
