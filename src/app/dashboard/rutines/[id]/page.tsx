"use client"

import Loader from "@/components/shared/Loader"
import { getOneRutine } from "@/lib/controllers/rutines"
import { Rutine } from "@/types"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useQuery, QueryClient } from "react-query"

const Exercises = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const queryClient = new QueryClient()
  const { data: session } = useSession()

  const {
    data: rutine,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutines"],
    queryFn: async () => {
      const rutines = await getOneRutine(id)
      return rutines as Rutine
    },
    onSuccess: () => {
      queryClient.invalidateQueries("rutines")
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
            Bienvenido a tu rutina {rutine?.name}, aqui podras agregarle
            ejercicios e ir cambiando los pesos y las repeticiones.
          </p>
        </div>
      </main>
    </>
  )
}

export default Exercises
