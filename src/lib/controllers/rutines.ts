import { Rutine } from "@/types"
import axios from "axios"

const rutineAPI = axios.create({
  baseURL: "http://localhost:3000/api/rutine",
})

export const createRutine = (rutine: Rutine) => {
  rutineAPI.post("/create", rutine)
}

export const getRutines = async (id: string) => {
  const rutines = await rutineAPI.get(`/get/${id}`)
  return rutines.data
}
