import React, { useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { deleteRutine } from "@/lib/controllers/rutines"
import { QueryClient, useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Rutine } from "@/types"
import { cn } from "@/lib/utils"

interface UserRutineProps {
  key: string
  rutine: Rutine
  rutines: Rutine[]
}

const UserRutine = ({ key, rutine, rutines }: UserRutineProps) => {
  const router = useRouter()
  const queryClient = new QueryClient()
  const [loader, setIsLoading] = useState(false)

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
  return (
    <div
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
                "ri-boxing-fill": rutine.category === "musculacion",
                "ri-mental-health-fill": rutine.category === "salud",
              }),
              "text-white text-lg",
            ].join(" ")}
          />
        </div>
        <div className="flex justify-start items-start flex-col gap-1">
          <h2 className="text-white font-normal text-base">{rutine.name}</h2>
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
}

export default UserRutine
