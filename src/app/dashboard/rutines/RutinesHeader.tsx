import React, { Dispatch } from "react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RutinesHeader = ({
  reducer,
}: {
  reducer: Dispatch<{
    type: "name" | "category"
    payload: string
  }>
}) => {
  return (
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
        onValueChange={(value) => reducer({ type: "category", payload: value })}
      >
        <SelectTrigger className="w-[180px] h-11 bg-transparent text-white border-[1px] border-gray-400 outline-none focus:border-[1px] focus:ring-0 focus:ring-transparent focus:border-gray-400 ">
          <SelectValue placeholder="Elige una categoria" />
        </SelectTrigger>
        <SelectContent className="bg-[#13131A] text-white font-semibold">
          <SelectGroup>
            <SelectLabel className="text-gray-300">Categoria</SelectLabel>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="musculacion">Musculacion</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="salud">Saludable</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Link
        href={"/dashboard/rutines/create"}
        className="w-44 h-11 bg-primary_green/20 border-[1px] border-primary_green flex items-center justify-center hover:bg-primary_light_green/40 transition-colors duration-200 text-white rounded-md font-semibold outline-none mr-[17px]"
      >
        Crear rutina
      </Link>
    </nav>
  )
}

export default RutinesHeader
