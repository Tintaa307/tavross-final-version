import { Rutine } from "@/types"
import axios from "axios"

const rutineAPI = axios.create({
  baseURL: "https://tavross-final-version.vercel.app/api/rutine",
})

export const createRutine = (rutine: Rutine) => {
  rutineAPI.post("/create", rutine)
}

export const getRutines = async (id: string) => {
  const rutines = await rutineAPI.get(`/get/${id}`)
  return rutines.data
}

export const getOneRutine = async (id: string) => {
  const rutine = await rutineAPI.get(`/get-one/${id}`)
  return rutine.data
}

export const deleteRutine = async (id: string) => {
  await rutineAPI.delete(`/delete/${id}`)
}
