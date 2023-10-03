import React from "react"
import { useRouter } from "next/navigation"

const LoginButton = () => {
  const router = useRouter()
  return (
    <div className="">
      <button className="w-40 h-14">
        <small
          onClick={() => router.push("/login")}
          className="text-white text-base font-normal border-b-[1.9px] pb-1 border-primary_green border-opacity-0 hover:border-opacity-100 transition-all"
        >
          Sign in
        </small>
      </button>
    </div>
  )
}

export default LoginButton
