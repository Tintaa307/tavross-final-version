import Link from "next/link"
import React from "react"

interface MessageProps {
  params: string
}

const Message = ({ params }: MessageProps) => {
  return (
    <main className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-[#00000094]">
      <div className="w-[650px] h-[550px] bg-[#13131A] rounded-sm flex items-center justify-center text-center flex-col gap-5">
        <h1 className="text-3xl font-bold text-white">
          No tienes ejercicios en esta rutina
        </h1>
        <p className="text-gray-400 text-base font-normal w-1/3">
          Agrega ejercicios a tu rutina para poder verlos aqui.
        </p>
        <Link
          className="text-white font-semibold flex items-center justify-center text-lg rounded-md bg-blue-600 p-3 hover:bg-blue-800 transition-colors duration-200"
          href={`/dashboard/rutines/${params}/create`}
        >
          Agregar ejercicios
        </Link>
        <div className="w-[80%] h-[1px] my-6 bg-gray-400 flex items-center justify-center"></div>
        <Link
          className="text-white font-semibold flex items-center justify-center text-lg rounded-md bg-transparent border-2 border-blue-600 py-3 px-16 hover:bg-blue-600 transition-colors duration-200"
          href={`/dashboard/rutines/`}
        >
          Volver
        </Link>
      </div>
    </main>
  )
}

export default Message
