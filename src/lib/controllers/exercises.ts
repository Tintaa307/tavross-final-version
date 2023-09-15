import { ExerciseListProps } from "@/types"
import axios from "axios"

const rutineAPI = axios.create({
  baseURL: "http://localhost:3000/api/exercises",
})

export const addExercises = async (exercises: ExerciseListProps) => {
  await rutineAPI.post("/", exercises)
}
