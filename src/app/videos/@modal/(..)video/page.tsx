"use client"

import Modal from "@/components/modal/Modal"
import { useRouter } from "next/navigation"
import React from "react"

const ModalVideo = () => {
  const router = useRouter()
  return (
    <Modal>
      <main className="w-full h-screen bg-black">
        <h1 className="text-white">Video desde paralel route</h1>
        <span className="text-white" onClick={() => router.back()}>
          Close modal
        </span>
      </main>
    </Modal>
  )
}

export default ModalVideo
