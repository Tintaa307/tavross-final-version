import { NextResponse } from "next/server"
import prismadb from "@/lib/db"

export async function POST(req: Request) {
  if (req.method !== "POST")
    return NextResponse.json({ message: "Method not allowed" }, { status: 400 })

  try {
    const response = await req.json()

    console.log(response)

    if (!response) {
      return NextResponse.json({ message: "Empty data" }, { status: 400 })
    }

    const { name, weight, reps, rutineId } = response

    const addExercises = await prismadb.rutineExercises.create({
      data: {
        name: name,
        weight: weight,
        reps: reps,
        rutinesId: rutineId,
      },
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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
