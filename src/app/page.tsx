"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="w-full h-screen flex items-center justify-center text-center flex-col gap-8">
      <div className="">
        <h1 className="text-white text-4xl font-semibold">
          Bienvenido a <span className="text-blue-700">Tavross</span>
        </h1>
      </div>
      <div className="">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-64 h-14 rounded-md bg-blue-800 text-white text-lg font-medium"
        >
          Ir a mi dashboard
        </button>
      </div>
    </main>
  )
}
