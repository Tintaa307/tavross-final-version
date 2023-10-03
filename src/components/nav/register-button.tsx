import { useRouter } from "next/navigation"
import React from "react"

const RegisterButton = () => {
  const router = useRouter()
  return (
    <div className="">
      <button
        onClick={() => router.push("/register")}
        className="w-40 h-14 bg-primary_dark_green text-white font-normal text-base rounded-sm hover:bg-primary_green/80 border-[1px] border-primary_light_green/40 transition-all duration-900"
      >
        Sign up for free
      </button>
    </div>
  )
}

export default RegisterButton
