"use client"

import Nav from "@/components/nav/Nav"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
