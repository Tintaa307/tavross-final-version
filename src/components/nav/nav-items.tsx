import { useRouter } from "next/navigation"
import React from "react"

const NavItems = ({
  name,
  path,
  icon,
}: {
  name: string
  path: string
  icon: string
}) => {
  const router = useRouter()
  return (
    <li
      onClick={() => {
        router.push(path)
      }}
      className="w-4/5 h-11 flex items-center justify-start hover:bg-[#ffffff2c] rounded-lg my-2 transition-all cursor-pointer"
    >
      <i className={[icon, "text-white text-xl mx-2"].join(" ")} />
      <small className="text-white text-[0.875rem]">{name}</small>
    </li>
  )
}

export default NavItems
