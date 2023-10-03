"use client"

import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"
import { useEffect, useReducer, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "react-query"
import { getRutines } from "@/lib/controllers/rutines"
import { Rutine } from "@/types"
import Card from "./Card"

import { cn } from "@/lib/utils"
import { Toaster } from "react-hot-toast"
import UserRutine from "./Rutine"
import Empty from "@/components/empty/Empty"
import RutinesHeader from "./RutinesHeader"

interface FilterProps {
  type: string
  category: string
}

const dispatchFilter = (
  state: { name: string; category: string },
  action: { type: "name" | "category"; payload: string }
) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload }
    case "category":
      return { ...state, category: action.payload }
    default:
      return state
  }
}

const Rutines = () => {
  const { status, data: session } = useSession()
  const { LOADING, UNAUTH } = statusAuth
  const [filteredRutines, setFilteredRutines] = useState<Rutine[]>()
  const [defaultFilter, reducer] = useReducer(dispatchFilter, {
    name: "",
    category: "todas",
  })
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
      return rutines as Rutine[]
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
          <Toaster />
          <div className="w-full h-full ">
            {rutines ? (
              <>
                <div className="w-full h-max flex items-center justify-normal text-center flex-col gap-6">
                  <h1 className="text-white font-semibold text-5xl mt-28">
                    Tus rutinas
                  </h1>
                  <p className="w-1/4 text-gray-400 text-normal text-base">
                    Aqui podrás ver todas tus rutinas, crear nuevas y editar las
                    que ya tienes creadas.
                  </p>
                </div>
                <div className="w-full h-max flex items-center justify-center flex-col gap-3 mt-12">
                  <RutinesHeader reducer={reducer} />
                  <div
                    className={cn(
                      "w-[660px] h-[max] flex items-center justify-center flex-col border-gray-400 border-[1px] rounded-md mb-6"
                    )}
                  >
                    {rutines!
                      .map((rutine) => {
                        return (
                          <UserRutine
                            key={rutine.id!}
                            rutines={rutines!}
                            rutine={rutine}
                          />
                        )
                      })
                      .filter((rutine) => {
                        if (defaultFilter.name === "") return rutine
                        else if (
                          rutine.props.rutine.name
                            .toLowerCase()
                            .includes(defaultFilter.name.toLowerCase())
                        ) {
                          return rutine
                        } else if (
                          rutine.props.rutine.category.toLowerCase() ===
                          defaultFilter.category.toLowerCase()
                        ) {
                          return rutine
                        }
                      }).length === 0 ? (
                      <Empty result={defaultFilter.name} />
                    ) : (
                      rutines!
                        .map((rutine) => {
                          return (
                            <UserRutine
                              key={rutine.id!}
                              rutines={rutines!}
                              rutine={rutine}
                            />
                          )
                        })
                        .filter((rutine) => {
                          if (defaultFilter.name === "") return rutine
                          else if (
                            rutine.props.rutine.name
                              .toLowerCase()
                              .includes(defaultFilter.name.toLowerCase())
                          ) {
                            return rutine
                          } else if (
                            rutine.props.rutine.category.toLowerCase() ===
                            defaultFilter.category.toLowerCase()
                          ) {
                            return rutine
                          }
                        })
                        .reverse()
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Card />
            )}
          </div>
        </main>
      )}
    </>
  )
}

export default Rutines
