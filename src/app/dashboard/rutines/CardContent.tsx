import React from "react"

const CardContent = ({
  name,
  icon,
  description,
}: {
  name: string
  icon: string
  description: string
}) => {
  return (
    <div className="w-1/4 h-[250px] rounded-md border-2 border-white flex items-center flex-col justify-center mx-3 gap-4">
      <div className="w-16 h-16 rounded-full bg-primary_dark_green flex items-center justify-center">
        <i className={[icon, "text-white text-3xl"].join(" ")} />
      </div>
      <h2 className="text-white font-semibold text-xl">{name}</h2>
      <p className="text-gray-400 text-normal text-base">{description}</p>
      <button className="w-3/4 h-10 text-white font-semibold rounded-md bg-primary_green/20 border-[1px] border-primary_green flex items-center justify-center outline-none hover:bg-primary_light_green/40 transition-colors duration-200">
        Agregar
      </button>
    </div>
  )
}

export default CardContent
