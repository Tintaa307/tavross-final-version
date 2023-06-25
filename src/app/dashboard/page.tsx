"use client"

import Nav from "@/components/nav/Nav"
import { signOut, useSession } from "next-auth/react"
import React from "react"

const Dashboard = () => {
  const { data: session, status } = useSession()
  return (
    <main className="w-full h-[86.5vh] flex items-center justify-center text-center">
      <div className="">
        <h1 className="text-white text-6xl font-bold flex flex-col justify-start items-start leading-tight">
          <span className="">CONSTRUI TU </span>
          CUERPO IDEAL
        </h1>
      </div>
    </main>
  )
}

export default Dashboard
