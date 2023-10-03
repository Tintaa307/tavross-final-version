"use client"

import { useSession } from "next-auth/react"
import React, { useState } from "react"
import "remixicon/fonts/remixicon.css"
import LoginButton from "./login-button"
import RegisterButton from "./register-button"
import Avatar from "./avatar"
import UserDisplay from "./user-display"
import NavItems from "./nav-items"
import { usePathname } from "next/navigation"

const Nav = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(
    "-translate-x-[400px] transition duration-950"
  )
  const { data: session } = useSession()

  const handleBlur = () => {
    setIsOpen("-translate-x-[400px] transition duration-950")
  }

  const navItems = [
    {
      name: "Inicio",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "Tus rutinas",
      path: "/dashboard/rutines",
      icon: "ri-table-line",
    },
    {
      name: "Calculadora RM",
      path: "/dashboard/calculator",
      icon: "ri-calculator-line",
    },
    {
      name: "Progreso",
      path: "/dashboard/progress",
      icon: "ri-bar-chart-2-line",
    },
    {
      name: "Contacto",
      path: "/dashboard/contact",
      icon: "ri-phone-line",
    },
  ]
  const handleOpen = () => {
    isOpen === "-translate-x-[400px] transition duration-1000"
      ? setIsOpen("translate-x-0 transition duration-1000")
      : setIsOpen("-translate-x-[400px] transition duration-1000")
  }

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" ? (
        <header className="fixed top-0 left-0 w-full h-20 z-20">
          <nav className="w-full h-full">
            <div className="fixed m-5 z-30">
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
              onBlur={handleBlur}
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
                  <NavItems
                    key={index}
                    name={item.name}
                    path={item.path}
                    icon={item.icon}
                  />
                ))}
              </ul>
              {session ? (
                <UserDisplay session={session} />
              ) : (
                <div className="absolute w-full bottom-5 left-0 flex items-center justify-center">
                  <h2 className="text-primary_green font-normal text-lg">
                    Sign in to continue
                  </h2>
                </div>
              )}
            </div>
            {!session ? (
              <article className="absolute top-8 right-14 flex flex-row gap-6">
                <LoginButton />
                <RegisterButton />
              </article>
            ) : (
              <article autoFocus={false} className="absolute top-5 right-12">
                <Avatar className="" />
              </article>
            )}
          </nav>
        </header>
      ) : null}
    </>
  )
}

export default Nav
