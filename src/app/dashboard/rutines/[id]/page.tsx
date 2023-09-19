"use client"

import Loader from "@/components/shared/Loader"
import { getRutineExercises } from "@/lib/controllers/exercises"
import { ExerciseListProps, Rutine } from "@/types"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useQuery, QueryClient } from "react-query"
import Message from "./Message"
import Exercise from "./Exercise"
import Link from "next/link"
import { getOneRutine } from "@/lib/controllers/rutines"

const Exercises = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const queryClient = new QueryClient()
  const { data: session } = useSession()

  const {
    data: exercises,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const exercises = await getRutineExercises(id)
      return exercises as ExerciseListProps[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      console.log("error")
    },
  })

  const { data: rutine } = useQuery({
    queryKey: ["rutine"],
    queryFn: async () => {
      const rutine = await getOneRutine(params.id)
      return rutine as Rutine
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      console.log("error")
    },
  })

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  if (isLoading) return <Loader />
  if (!session) return <Loader />
  else if (isError) console.log(error)

  return (
    <>
      <main className="w-full h-full flex items-center justify-center flex-col gap-24">
        <div className="w-full h-full flex items-center justify-center text-center flex-col gap-5">
          <h1 className="text-4xl font-bold text-white">{rutine?.name}</h1>
          <p className="text-gray-400 text-base font-normal w-1/3">
            Aqui puedes ver tu rutina de entrenamiento, podrás agregarle
            ejercicios e ir cambiando los pesos y las repeticiones.
          </p>
          <small className="text-white font-normal text-lg">
            Puedes agregar mas ejercicios{" "}
            <Link
              href={`/dashboard/rutines/${id}/create`}
              className="text-blue-600 underline underline-blue-600"
            >
              aquí
            </Link>
          </small>
        </div>
        {exercises?.length === 0 && <Message params={id} />}
        <div className="w-full h-full flex items-center justify-center flex-row gap-5">
          {exercises?.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} rutineId={id} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Exercises
