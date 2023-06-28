"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import "remixicon/fonts/remixicon.css"
import { Variants, motion } from "framer-motion"
import { cn } from "@/lib/utils"

const variants: Variants = {
  open: {
    width: "350px",
    height: "500px",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  closed: {
    width: "20px",
    height: "20px",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
}

const iconVariants: Variants = {
  open: {
    x: 146,
    y: -221,
    transition: {
      duration: 0.4,
      type: "tween",
    },
  },
  closed: {
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(
    "-translate-x-[400px] transition duration-950"
  )
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userImage, setUserImage] = useState("")
  const [openState, setOpenState] = useState(false)

  useEffect(() => {
    if (session) {
      if (session?.user?.image) {
        setUserImage(session?.user?.image.toString()!)
      }
    }
  }, [session])

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "Your rutines",
      path: "/dashboard/rutinas",
      icon: "ri-table-line",
    },
    {
      name: "Your RM",
      path: "/dashboard/rm",
      icon: "ri-calculator-line",
    },
    {
      name: "Progress",
      path: "/dashboard/progreso",
      icon: "ri-bar-chart-2-line",
    },
    {
      name: "Contact",
      path: "/dashboard/contacto",
      icon: "ri-phone-line",
    },
  ]
  const handleOpen = () => {
    isOpen === "-translate-x-[400px] transition duration-1000"
      ? setIsOpen("translate-x-0 transition duration-1000")
      : setIsOpen("-translate-x-[400px] transition duration-1000")
  }

  return (
    <header className="relative top-0 left-0 w-full h-20">
      <nav className="w-full h-full">
        <div className="fixed m-5">
          <i
            onClick={handleOpen}
            className={[
              "ri-menu-fill",
              "text-2xl text-white cursor-pointer font-normal",
            ].join(" ")}
          />
        </div>
        <div
          className={[
            "fixed top-0 left-0 w-80 h-screen bg-[#1f1f2e] rounded-r-2xl z-40",
            isOpen,
          ].join(" ")}
        >
          <div className="absolute right-6 top-6 w-8 h-8 hover:bg-[#ffffff2b] flex items-center justify-center rounded-lg">
            <i
              onClick={handleOpen}
              className={[
                "ri-close-line",
                "text-white text-2xl cursor-pointer",
              ].join(" ")}
            />
          </div>
          <div className="mt-7 ml-5">
            <small className="text-white text-lg">Tavross</small>
          </div>
          <ul className="mt-12 w-full h-max flex items-center justify-center flex-col">
            {navItems.map((item, index) => (
              <li
                className="w-4/5 h-11 flex items-center justify-start hover:bg-[#ffffff2c] rounded-lg my-2 transition-all cursor-pointer"
                key={index}
              >
                <i
                  className={[item.icon, "text-white text-xl mx-2"].join(" ")}
                />
                <small className="text-white text-[0.875rem]">
                  {item.name}
                </small>
              </li>
            ))}
          </ul>
          {session ? (
            <div className="absolute w-full h-max bottom-5 left-0  flex items-start justify-start flex-row">
              {userImage !== "" ? (
                <Image
                  src={userImage}
                  alt="user-image"
                  className="rounded-full cursor-pointer mx-4"
                  width={35}
                  height={35}
                />
              ) : (
                <div className="w-14 h-14 mx-4 cursor-pointer bg-transparent border-2 border-blue-500 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-white text-2xl" />
                </div>
              )}
              <div className="flex flex-col">
                <h4 className="text-white font-normal text-sm">
                  {session?.user?.name}
                </h4>
                <small className="text-[#ffffff57] text-xs">
                  {session?.user?.email}
                </small>
              </div>
              <button
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000/login" })
                }
                className="absolute -mt-4 right-4 w-14 h-16 rounded hover:bg-[#ffffff2b] transition-all"
              >
                <i
                  className={["ri-logout-box-line", "text-white text-xl"].join(
                    " "
                  )}
                />
              </button>
            </div>
          ) : (
            <div className="absolute w-full bottom-5 left-0 flex items-center justify-center">
              <h2 className="text-white font-normal text-lg">
                You are not logged yet
              </h2>
            </div>
          )}
        </div>
        {!session ? (
          <article className="absolute top-8 right-14 flex flex-row gap-6">
            <div className="">
              <button className="w-40 h-14">
                <small
                  onClick={() => router.push("/login")}
                  className="text-white text-base font-normal border-b-[1.9px] pb-1 border-blue-600 border-opacity-0 hover:border-opacity-100 transition-all"
                >
                  Sign in
                </small>
              </button>
            </div>
            <div className="">
              <button
                onClick={() => router.push("/register")}
                className="w-40 h-14 bg-blue-700 text-white font-normal text-base rounded-sm hover:bg-blue-800 transition-all duration-900"
              >
                Sign up for free
              </button>
            </div>
          </article>
        ) : (
          <article className="absolute top-5 right-12 flex flex-row">
            <div onClick={() => setOpenState(!openState)} className="">
              <Image
                src={userImage}
                alt="user-image"
                className="rounded-full cursor-pointer"
                width={45}
                height={45}
              />
              <motion.div
                initial={"closed"}
                variants={variants}
                animate={openState ? "open" : "closed"}
                className="absolute flex items-center justify-center top-8 right-0 bg-[#1f1f2e] rounded-lg z-40"
              >
                <motion.i
                  initial={"closed"}
                  variants={iconVariants}
                  animate={openState ? "open" : "closed"}
                  className={cn(
                    "ri-arrow-down-s-line",
                    "text-white text-xs rounded cursor-pointer",
                    openState ? "hidden" : "block"
                  )}
                />
                <motion.i
                  initial={"closed"}
                  variants={iconVariants}
                  animate={openState ? "open" : "closed"}
                  className={cn(
                    "ri-close-line",
                    "text-white text-xl rounded cursor-pointer",
                    openState ? "block" : "hidden"
                  )}
                />
              </motion.div>
            </div>
          </article>
        )}
      </nav>
    </header>
  )
}

export default Nav
