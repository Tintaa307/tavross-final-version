"use client"

import Loader from "@/components/shared/Loader"
import { getRutineExercises } from "@/lib/controllers/exercises"
import { ExerciseListProps } from "@/types"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useQuery, QueryClient } from "react-query"

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

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  if (isLoading) return <Loader />
  if (!session) return <Loader />
  else if (isError) console.log(error)

  return (
    <>
      <main className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-full h-full flex items-center justify-center text-center flex-col gap-5">
          <h1 className="text-3xl font-bold text-white">
            Bienvenido, {session.user?.name}
          </h1>
          <p className="text-gray-400 text-base font-normal w-1/3">
            Aqui puedes ver tu rutina de entrenamiento, podrás agregarle
            ejercicios e ir cambiando los pesos y las repeticiones.
          </p>
        </div>

        <div>
          {exercises?.map((exercise, index) => (
            <div key={index}>
              <h1 className="text-white">{exercise.name}</h1>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Exercises
