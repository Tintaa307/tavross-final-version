"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"

const Providers = ({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Providers
