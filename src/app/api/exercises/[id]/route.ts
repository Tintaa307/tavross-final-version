import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "GET")
    return NextResponse.json({ message: "Method not allowed" }, { status: 400 })

  try {
    const { id } = params

    if (!id) {
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

    const oneRutine = getUserRutines.find(
      (rutine) => rutine.id.toString() === id
    )

    const exercises = await prismadb.rutineExercises.findMany({
      where: {
        rutinesId: oneRutine!.id,
      },
    })

    if (!exercises) {
      return NextResponse.json({ message: "no exercises" }, { status: 400 })
    }

    return NextResponse.json(exercises, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
