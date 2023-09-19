import Model from "@/components/model/Model"
import React from "react"

const page = () => {
  return (
    <div className="w-full h-screen">
      <Model
        url={"ANIMACION_TRICEP"}
        cameraPosition={{
          x: 0.17,
          y: 0.17,
          z: 0.19,
        }}
      />
    </div>
  )
}

export default page
