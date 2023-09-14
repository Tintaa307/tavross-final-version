"use client"

import Loader from "@/components/shared/Loader"
import { statusAuth } from "@/objects/status"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Link from "next/link"
import { cn } from "@/lib/utils"
import toast, { Toaster } from "react-hot-toast"

const Rutines = () => {
  const { status, data: session } = useSession()
  const { LOADING, UNAUTH } = statusAuth
  const [loader, setIsLoading] = useState(false)
  const router = useRouter()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === UNAUTH) {
      router.push("/login")
    }
  }, [status])

  const deleteRutineMutation = useMutation({
    mutationKey: ["deleteRutine"],
    mutationFn: async (rutineId: string) => {
      await deleteRutine(rutineId)
    },
    onSuccess: () => {
      toast.success("Rutine deleted")
      router.push("/dashboard/rutines")
      queryClient.invalidateQueries("rutines")
    },
    onError: () => {
      toast.error("Error deleting")
    },
  })

  const handleSubmit = async (rutineId: string) => {
    setIsLoading(true)
    try {
      await deleteRutineMutation.mutateAsync(rutineId)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const [filteredRutines, setFilteredRutines] = useState<Rutine[]>(rutines)

  useEffect(() => {
    console.log(filteredRutines)
  }, [filteredRutines])

  const filterRutines = (filter: string) => {
    setFilteredRutines(
      rutines.filter((rutine: Rutine) => rutine.name.includes(filter))
    )
  }

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
            {filteredRutines?.length === 0 && <Card />}
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
                    onChange={(e) => filterRutines(e.target.value)}
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px] h-11 bg-transparent text-white border-[1px] border-gray-400 outline-none focus:border-[1px] focus:ring-0 focus:ring-transparent focus:border-gray-400 ">
                    <SelectValue placeholder="Elige una categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#13131A] text-white font-semibold">
                    <SelectGroup>
                      <SelectLabel>Categoria</SelectLabel>
                      <SelectItem value="fuerza">Todas</SelectItem>
                      <SelectItem value="fuerza">Musculacion</SelectItem>
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
                    "overflow-y-scroll max-h-[600px]": rutines.length > 7,
                  }
                )}
              >
                {filteredRutines.map((rutine: Rutine) => {
                  return (
                    <div
                      key={rutine.id}
                      className={cn(
                        "w-full h-max flex items-center justify-between px-4 py-3 hover:bg-slate-400 hover:bg-opacity-20 transition-colors duration-200 ",
                        {
                          "border-b-[1px] border-gray-400":
                            rutines.indexOf(rutine) !== rutines.length - 1,
                        }
                      )}
                    >
                      <div className="w-max h-max flex items-center justify-center flex-row gap-6">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            {
                              "bg-blue-600": rutine.category === "cardio",
                              "bg-[#ff6b6b]": rutine.category === "musculacion",
                              "bg-[#12b20e]": rutine.category === "salud",
                            }
                          )}
                        >
                          <i
                            className={[
                              cn({
                                "ri-run-line": rutine.category === "cardio",
                                "ri-boxing-fill":
                                  rutine.category === "musculacion",
                                "ri-mental-health-fill":
                                  rutine.category === "salud",
                              }),
                              "text-white text-lg",
                            ].join(" ")}
                          />
                        </div>
                        <div className="flex justify-start items-start flex-col gap-1">
                          <h2 className="text-white font-normal text-base">
                            {rutine.name}
                          </h2>
                          <p className="text-gray-400 font-normal text-base">
                            {rutine.category}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <i
                              className={[
                                "ri-more-fill",
                                "text-white text-xl cursor-pointer",
                              ].join(" ")}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-max h-max bg-[#13131A]">
                            <button
                              onClick={() => {
                                handleSubmit(rutine.id!)
                                console.log(rutine.id)
                              }}
                              className="w-max h-max px-3 p-2 border-[1px] bg-transparent border-[#ee223b] rounded-md text-[#ee223b] font-semibold hover:bg-[#ee223b] transition-colors duration-200 hover:text-white"
                            >
                              Eliminar rutina
                            </button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Rutines
