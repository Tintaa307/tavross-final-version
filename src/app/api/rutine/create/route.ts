import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { Rutine } from "@/types"

export async function POST(req: Request) {
  if (req.method !== "POST")
    return NextResponse.json({ message: "Bad Request" }, { status: 400 })
  try {
    const response = await req.json()

    const { name, frequency, category, identifier }: Rutine = response

    if (!name || !frequency || !category || !identifier) {
      return NextResponse.json({ message: "Empty data" }, { status: 400 })
    }

    const getUserSession = await prismadb.user.findUnique({
      where: {
        email: identifier,
      },
    })

    if (!getUserSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prismadb.rutines.create({
      data: {
        name: name,
        frequency: frequency,
        category: category,
        userId: getUserSession.id,
      },
    })

    return NextResponse.json({ message: "Rutine created" }, { status: 201 })
  } catch (error) {}
}
