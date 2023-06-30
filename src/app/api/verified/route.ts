import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prismadb from "../../../lib/db"
import { DecodedToken } from "@/types"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    }

    const response = await req.json()

    const { token } = response

    console.log(token)

    const decode = jwt.decode(token) as jwt.JwtPayload

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 409 })
    }

    const getRefreshToken = await prismadb.verificationToken.findUnique({
      where: {
        identifier: token,
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
          email: decode.data.email,
        },
        data: {
          emailVerified: true,
        },
      })

      if (!userAuth) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      console.log(userAuth)
      return NextResponse.json(
        { message: "Email verified", data: userAuth.emailVerified },
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
