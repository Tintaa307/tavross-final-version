import prismadb from "../../../lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    const response = await req.json()

    const { name, email, password } = response

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await prismadb.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        image: "",
      },
    })

    return NextResponse.json({
      message: "User created successfully",
      data: newUser,
    })
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
