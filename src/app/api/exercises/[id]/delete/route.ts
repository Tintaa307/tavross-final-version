import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "DELETE")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })

  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Empty data" }, { status: 400 })
    }

    const response = await req.json()

    const { data } = response

    console.log(data)

    if (!response) {
      return NextResponse.json({ error: "Empty data" }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const getUserSession = await prismadb.user.findUnique({
      where: {
        email: session.user!.email!,
      },
    })

    console.log(getUserSession)

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

    if (!rutine) {
      return NextResponse.json({ message: "Rutine not found" }, { status: 404 })
    }

    const getAllRutineExercises = await prismadb.rutineExercises.findMany({
      where: {
        rutinesId: rutine.id,
      },
    })

    if (!getAllRutineExercises) {
      return NextResponse.json({ message: "no exercises" }, { status: 400 })
    }

    const rutineExercise = getAllRutineExercises.find(
      (exercise) => exercise.name.toString() === response.data.name
    )

    if (!rutineExercise) {
      return NextResponse.json(
        { message: "Exercise not found" },
        { status: 404 }
      )
    }

    const deleteRutineExercise = await prismadb.rutineExercises.delete({
      where: {
        id: rutineExercise.id,
      },
    })

    if (!deleteRutineExercise) {
      return NextResponse.json(
        { message: "Exercise not deleted" },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: "Exercise deleted" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "error" }, { status: 400 })
  }
}
