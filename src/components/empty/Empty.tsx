import React from "react"

interface EmptyProps {
  result: string
}

const Empty = ({ result }: EmptyProps) => {
  return (
    <div className="w-[660px] h-max border-gray-400 bg-transparent rounded-md flex items-center justify-center flex-col text-center gap-4 py-4">
      <h2 className="text-white text-2xl font-semibold">
        No se encontraron resultados
      </h2>
      <p className="text-gray-400 font-normal text-base px-3">
        Tu busqueda &quot;{result}&quot; no devolvio ningun resultado, intenta
        con otro nombre o categoria.
      </p>
    </div>
  )
}

export default Empty
