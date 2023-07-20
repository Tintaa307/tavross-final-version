"use client"

import Nav from "@/components/nav/Nav"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function RootLayout({
  children,
  session,
  modal,
}: {
  children: React.ReactNode
  session: Session | null
  modal: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <>
      <SessionProvider session={session}>
        <Nav />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
