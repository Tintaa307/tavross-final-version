import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (req.method !== "DELETE")
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 400 }
      )

    if (!params.id) {
      return NextResponse.json({ message: "Empty data" }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const getUserSession = await prismadb.user.findUnique({
      where: {
        email: session.user!.email!,
      },
    })

    if (!getUserSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const getUserRutines = await prismadb.rutines.findMany({
      where: {
        userId: getUserSession.id,
      },
    })

    if (!getUserRutines) {
      return NextResponse.json({ message: "no rutines" }, { status: 400 })
    }

    const rutine = getUserRutines.find(
      (rutine) => rutine.id.toString() === params.id
    )

    console.log(rutine)

    if (!rutine) {
      return NextResponse.json({ message: "Rutine not found" }, { status: 404 })
    }

    await prismadb.rutines.delete({
      where: {
        id: rutine.id,
      },
    })

    return NextResponse.json({ message: "Rutine deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
