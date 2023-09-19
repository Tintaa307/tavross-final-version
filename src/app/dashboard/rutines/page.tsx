"use client"

import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"
import { useEffect, useReducer, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { deleteRutine, getRutines } from "@/lib/controllers/rutines"
import { Rutine } from "@/types"
import Card from "./Card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from "next/link"
import { cn } from "@/lib/utils"
import toast, { Toaster } from "react-hot-toast"
import UserRutine from "./Rutine"
import Empty from "@/components/empty/Empty"

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
          <div className="w-full h-full flex items-center justify-center flex-col gap-12">
            {!rutines && <Card />}
            <div className="w-full h-max flex items-center justify-normal text-center flex-col gap-6">
              <h1 className="text-white font-semibold text-5xl mt-28">
                Tus rutinas
              </h1>
              <p className="w-1/4 text-gray-400 text-normal text-base">
                Aqui podrás ver todas tus rutinas, crear nuevas y editar las que
                ya tienes creadas.
              </p>
            </div>
            <div className="w-full h-max flex items-center justify-center flex-col gap-3">
              <nav className="w-full h-max flex items-center justify-center flex-row gap-2">
                <div className="w-max h-max flex items-center justify-center flex-row">
                  <i
                    className={[
                      "ri-search-line",
                      "relative text-gray-400 text-lg left-8",
                    ].join(" ")}
                  />
                  <input
                    type="text"
                    placeholder="Buscar rutina..."
                    className="w-72 h-11 bg-transparent border-[1px] border-gray-400 text-gray-400 text-base font-medium pl-10 rounded-md outline-none focus:outline-[3px] focus:outline-gray-500 transition-all duration-100"
                    onChange={(e) =>
                      reducer({
                        type: "name",
                        payload: e.target.value as string,
                      })
                    }
                  />
                </div>
                <Select
                  defaultValue={"todas"}
                  onValueChange={(value) =>
                    reducer({ type: "category", payload: value })
                  }
                >
                  <SelectTrigger className="w-[180px] h-11 bg-transparent text-white border-[1px] border-gray-400 outline-none focus:border-[1px] focus:ring-0 focus:ring-transparent focus:border-gray-400 ">
                    <SelectValue placeholder="Elige una categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#13131A] text-white font-semibold">
                    <SelectGroup>
                      <SelectLabel className="bg-[#111111] text-gray-300">
                        Categoria
                      </SelectLabel>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="musculacion">Musculacion</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="salud">Saludable</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Link
                  href={"/dashboard/rutines/create"}
                  className="w-44 h-11 bg-white flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 text-black rounded-md font-semibold outline-none mr-[17px]"
                >
                  Crear rutina
                </Link>
              </nav>
              <div
                className={cn(
                  "w-[660px] h-[max] flex items-center justify-center flex-col border-gray-400 border-[1px] rounded-md mb-6",
                  {
                    "overflow-y-scroll max-h-[600px]": rutines!.length > 7,
                  }
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
          </div>
        </main>
      )}
    </>
  )
}

export default Rutines
