"use client"

import Nav from "@/components/nav/Nav"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"

export default function RootLayout({
  children,
  session,
  modal,
}: {
  children: React.ReactNode
  session: Session | null
  modal: React.ReactNode
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Nav />
        {modal}
        {children}
      </SessionProvider>
    </>
  )
}
