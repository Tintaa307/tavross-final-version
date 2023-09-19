import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (req.method !== "PUT")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })

  try {
    const { id } = params
    const response = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Empty data" }, { status: 400 })
    }

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

    const oneExercise = getAllRutineExercises.find(
      (exercise) => exercise.name.toString() === response.name
    )

    const updateExercise = await prismadb.rutineExercises.update({
      where: {
        id: oneExercise!.id,
      },
      data: {
        weight: response.weight,
        reps: response.reps,
      },
    })

    if (!updateExercise) {
      return NextResponse.json({ message: "error updating" }, { status: 400 })
    }

    console.log(updateExercise)

    return NextResponse.json(
      { message: "Exercise update succesfully" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
