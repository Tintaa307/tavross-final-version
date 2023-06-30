import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prismadb from "../../../lib/db"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    }

    const response = await req.json()

    const { token } = response

    console.log(token)

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 })
    }

    const getRefreshToken = await prismadb.verificationToken.findUnique({
      where: {
        identifier: token.email,
      },
    })

    if (!getRefreshToken) {
      return NextResponse.json(
        { error: "Refresh Token not found" },
        { status: 404 }
      )
    }

    if (getRefreshToken) {
      const userAuth = await prismadb.user.update({
        where: {
          email: token!.email,
        },
        data: {
          emailVerified: true,
        },
      })

      NextResponse.json(
        { message: "Email verified", data: userAuth },
        { status: 200 }
      )
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
