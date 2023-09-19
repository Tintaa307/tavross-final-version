import Model from "@/components/model/Model"
import React from "react"

const page = () => {
  return (
    <div className="w-full h-screen">
      <Model
        url={"ANIMACION_TRICEP"}
        cameraPosition={{
          x: 0.2,
          y: 0.2,
          z: 0.8,
        }}
      />
    </div>
  )
}

export default page
