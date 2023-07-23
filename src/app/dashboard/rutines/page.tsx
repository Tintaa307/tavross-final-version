"use client"

import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "react-query"
import { getRutines } from "@/lib/controllers/rutines"
import { Rutine } from "@/types"
import Link from "next/link"

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
          <div className="w-full h-full flex items-center justify-center flex-col">
            <div className="w-full h-screen fixed bg-[#00000081] top-0 left-0 flex items-center justify-center">
              <div className="w-[450px] h-[450px] bg-[#13131a] rounded flex items-center justify-start flex-col">
                <h1 className="text-white text-4xl font-normal mt-12 mb-6">
                  Rutines
                </h1>
                <h2 className="text-white text-2xl font-normal">
                  You dont have any rutine yet
                </h2>
                <p className="text-gray-500 text-xl font-normal mt-4">
                  Create one{" "}
                  <Link
                    className="text-blue-600 underline text-normal"
                    href="/dashboard/rutines/create"
                  >
                    Here
                  </Link>
                </p>
                <h6>----------or----------</h6>
                <div className="w-full h-full flex items-center justify-center flex-row gap-4">
                  <button className="w-1/2 h-12 bg-transparent border-[1px] border-gray-500 outline-none rounded-sm">
                    HOLA
                  </button>
                  <button className="w-1/2 h-12 bg-transparent border-[1px] border-gray-500 outline-none rounded-sm">
                    HOLA
                  </button>
                  <button className="w-1/2 h-12 bg-transparent border-[1px] border-gray-500 outline-none rounded-sm">
                    HOLA
                  </button>
                  <button className="w-1/2 h-12 bg-transparent border-[1px] border-gray-500 outline-none rounded-sm">
                    HOLA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Rutines
