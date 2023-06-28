"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "remixicon/fonts/remixicon.css"

const VerifyEmail = () => {
  const [counter, setCounter] = useState(0)
  const router = useRouter()

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter((prevState) => prevState + 1)
  //   }, 1000)

  //   if (counter >= 10) {
  //     router.push("/login")
  //   }
  // }, [])

  return (
    <main className="w-full h-screen flex items-center justify-center drop-shadow-green">
      <div className="w-[550px] h-[230px] bg-[#1f1f2e] rounded-lg">
        <div className="w-full h-full flex items-center justify-center flex-row gap-12">
          <div className="w-24 h-24 rounded-full bg-[#12b20e] flex items-center justify-center">
            <i
              className={[
                "ri-check-line",
                "text-white font-bold text-3xl",
              ].join(" ")}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-white font-normal text-lg">
              Te has verificado correctamente!
            </h2>
            <small className="text-white font-normal text-base">
              Te redirigiremos en {counter}
            </small>
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerifyEmail
