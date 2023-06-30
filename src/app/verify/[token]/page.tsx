"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "remixicon/fonts/remixicon.css"
import { useParams } from "next/navigation"

const VerifyEmail = () => {
  const [counter, setCounter] = useState(10)
  const router = useRouter()
  const params = useParams()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    handleVerified()
  })

  useEffect(() => {}, [counter])

  const handleVerified = async () => {
    try {
      await axios
        .post("../api/verified", {
          token: params!.token,
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

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
          <div className="flex flex-col gap-2">
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
