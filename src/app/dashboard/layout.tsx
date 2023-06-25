"use client"

import Nav from "@/components/nav/Nav"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Nav />
        {children}
      </SessionProvider>
    </>
  )
}
