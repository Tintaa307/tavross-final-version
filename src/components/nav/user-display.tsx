import React from "react"
import Avatar from "./avatar"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"

const UserDisplay = ({ session }: { session: Session | null }) => {
  return (
    <div className="absolute w-full h-max bottom-5 left-0  flex items-start justify-start flex-row ">
      <Avatar className="mx-2" />
      <div className="w-1/2 flex flex-col">
        <h4 className="text-white font-normal text-sm">
          {session?.user?.name}
        </h4>
        <small className="text-[#ffffff57] text-xs w-1/2">
          {session?.user?.email?.length! > 25
            ? session?.user?.email?.split("@")[0].concat("...")
            : session?.user?.email}
        </small>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}
        className="absolute -mt-4 right-4 w-14 h-16 rounded hover:bg-[#ffffff2b] transition-all"
      >
        <i className={["ri-logout-box-line", "text-white text-xl"].join(" ")} />
      </button>
    </div>
  )
}

export default UserDisplay
