"use client"

import { useRouter } from "next/navigation"
import React from "react"

const Video = () => {
  const router = useRouter()
  return (
    <main className="w-full h-screen bg-black">
      <h1 className="text-white">Video desde ruta normal</h1>
      <span onClick={() => router.back()}>Close modal</span>
    </main>
  )
}

export default Video
