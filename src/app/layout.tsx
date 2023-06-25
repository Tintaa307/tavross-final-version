import "./globals.css"
import { Inter, Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })

export const metadata = {
  title: "Tavross",
  description: "Is not a App for the gym, is a lifestyle",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
