import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "GET")
    return NextResponse.json({ message: "Method not allowed" }, { status: 400 })
  try {
    if (!params.id) {
      return NextResponse.json({ message: "Empty data" }, { status: 400 })
    }

    const rutineUser = await prismadb.user.findUnique({
      where: {
        email: params.id,
      },
    })

    if (!rutineUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const rutines = await prismadb.rutines.findMany({
      where: {
        userId: rutineUser.id,
      },
    })

    if (!rutines) {
      return NextResponse.json({ message: "No rutines found" }, { status: 404 })
    }

    return NextResponse.json(rutines, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
