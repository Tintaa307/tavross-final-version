"use client"

import About from "@/components/about/About"
import Landing from "@/components/landing/Landing"
import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"

export default function Home() {
  const { status } = useSession()
  const { LOADING } = statusAuth
  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <>
          <Landing />
          <About />
        </>
      )}
    </>
  )
}
