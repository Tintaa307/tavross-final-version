import { NextResponse } from "next/server"
import prismadb from "@/lib/db"
import { ExerciseListProps } from "@/types"

export async function POST(req: Request) {
  if (req.method !== "POST")
    return NextResponse.json({ message: "Method not allowed" }, { status: 400 })

  try {
    const response = await req.json()

    const exerciseList = [] as ExerciseListProps[]

    response.forEach((exercise: ExerciseListProps) => {
      exerciseList.push(exercise)
    })

    if (!response) {
      return NextResponse.json({ message: "Empty data" }, { status: 400 })
    }

    const addExercises = await prismadb.rutineExercises.createMany({
      data: exerciseList,
    })

    console.log(addExercises)

    if (!addExercises) {
      return NextResponse.json({ message: "Error" }, { status: 400 })
    }

    return NextResponse.json(
      { message: "Exercises added succesfully" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
