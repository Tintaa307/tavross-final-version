"use client"

import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "react-query"
import { getRutines } from "@/lib/controllers/rutines"
import { Rutine } from "@/types"

const Rutines = () => {
  const { status, data: session } = useSession()
  const { LOADING, UNAUTH } = statusAuth
  const router = useRouter()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === UNAUTH) {
      router.push("/login")
    }
  }, [status])

  const {
    data: rutines,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutines"],
    enabled: !!session?.user?.email,
    queryFn: async () => {
      const rutines = await getRutines(session?.user?.email!)
      return rutines
    },
    onSuccess: () => {
      queryClient.invalidateQueries("rutines")
    },
    onError: () => {
      console.log("error")
    },
  })

  if (isLoading) return <Loader />
  else if (isError) console.log(error)

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <main className="w-full h-[86vh] flex items-center justify-center flex-col">
          <h1 className="">Your rutines</h1>
          <div className="w-full h-full items-center justify-center flex-col">
            {!rutines ? (
              <p>You dont have any rutine</p>
            ) : (
              rutines.map((rutine: Rutine) => (
                <div key={rutine.id}>
                  <p>{rutine.name}</p>
                  <p>{rutine.frequency}</p>
                  <p>{rutine.category}</p>
                </div>
              ))
            )}
          </div>
        </main>
      )}
    </>
  )
}

export default Rutines
