import { ExerciseListProps } from "@/types"
import axios from "axios"

const rutineAPI = axios.create({
  baseURL: "https://tavross-final-version.vercel.app/api/exercises",
})

export const addExercises = async (exercises: ExerciseListProps[]) => {
  await rutineAPI.post("/", exercises)
}

export const getRutineExercises = async (rutineId: string) => {
  const exercises = await rutineAPI.get(`/${rutineId}`)
  return exercises.data
}

export const updateRutineExercises = async (
  rutineId: string,
  exercises: ExerciseListProps
) => {
  await rutineAPI.put(`/${rutineId}/update`, exercises)
}

export const deleteRutineExercises = async (rutineId: string) => {
  await rutineAPI.delete(`/${rutineId}/delete`)
}
