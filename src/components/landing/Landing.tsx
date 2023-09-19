import React from "react"
import Posts from "../posters/Posts"
import { useRouter } from "next/navigation"
import Model from "../model/Model"

const Landing = () => {
  const router = useRouter()
  return (
    <main className="w-full h-[86.5vh] flex items-center justify-center text-center flex-row z-10">
      <div className="w-1/2 h-max flex items-center justify-center flex-col gap-2">
        <div className="">
          <h1 className="text-white text-6xl font-bold flex flex-col justify-center items-center leading-tight select-none">
            EL LUGAR PERFECTO PARA
            <span className="special">CONSTRUIR TU</span>
            CUERPO IDEAL
          </h1>
        </div>
        <div className="w-1/3 flex justify-start items-start text-center">
          <p className="text-[#ffffff57] text-sm">
            En Tavross te vamos a ayudar a construir tu cuerpo ideal y mantener
            tu salud en muy buen estado.
          </p>
        </div>
        <article className="w-full flex items-center justify-center flex-row gap-8 mt-5">
          <div className="">
            <button
              onClick={() => router.push("/dashboard/rutines")}
              className="w-40 h-12 bg-blue-800 text-white font-normal rounded hover:bg-blue-900 transition-all flex items-center justify-center flex-row"
            >
              <span className="ml-2">Comencemos</span>{" "}
              <i className={["ri-arrow-right-line", ""].join(" ")} />
            </button>
          </div>
        </article>
      </div>
      <div className="w-1/2 h-[86.5vh] flex items-center justify-center">
        <Model
          url={"ANIMACION_REMO"}
          cameraPosition={{
            x: 0.042,
            y: 0.042,
            z: 0.042,
          }}
        />
      </div>
    </main>
  )
}

export default Landing
