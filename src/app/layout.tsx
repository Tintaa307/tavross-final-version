import Providers from "@/components/providers/Providers"
import "./globals.css"
import { Rubik } from "next/font/google"
import { Session } from "next-auth"
import Nav from "@/components/nav/Nav"

const rubik = Rubik({ subsets: ["latin"] })

export const metadata = {
  title: "Tavross",
  description: "Is not a App for the gym, is a lifestyle",
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <html lang="en">
      <Providers session={session}>
        <body className={rubik.className}>
          <Nav />
          {children}
        </body>
      </Providers>
    </html>
  )
}
