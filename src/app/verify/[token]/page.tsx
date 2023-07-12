"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "remixicon/fonts/remixicon.css"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import Loader from "@/components/shared/Loader"

const VerifyEmail = () => {
  const [counter, setCounter] = useState(3)
  const router = useRouter()
  const params = useParams()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        setCounter(counter !== 0 ? counter - 1 : 0)
      }, 800)

      if (counter === 0) {
        router.push("/login")
      }
    }
  }, [counter, isVerified])

  const handleVerified = async () => {
    try {
      await axios
        .post("../api/verified", {
          token: params!.token,
        })
        .then((response) => {
          console.log(response.data.data)
          setIsVerified(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  handleVerified()
  return (
    <main
      className={cn("w-full h-screen flex items-center justify-center", {
        "drop-shadow-red": !isVerified,
        "drop-shadow-green": isVerified,
      })}
    >
      <div className="w-[550px] h-[230px] bg-[#1f1f2e] rounded-lg">
        <div className="w-full h-full flex items-center justify-center flex-row gap-12">
          <div
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center",
              {
                "bg-red": !isVerified,
                "bg-[#12b20e]": isVerified,
              }
            )}
          >
            <i
              className={[
                "ri-check-line",
                "text-white font-bold text-3xl",
              ].join(" ")}
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            <h2 className="text-white font-normal text-lg">
              {!isVerified
                ? "Correo no verificado"
                : "Te has verificado correctamente!"}
            </h2>
            <small className="text-white font-normal text-base">
              {isVerified
                ? `Te redirigiremos en ${counter}...`
                : "Porfavor espere unos segundos"}
            </small>
            {!isVerified ? (
              <div className="w-8 h-8 rounded-full border-2 border-solid border-red border-l-transparent bg-transparent animate-spin"></div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerifyEmail
