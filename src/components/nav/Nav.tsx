import Link from "next/link"
import React from "react"
import "remixicon/fonts/remixicon.css"

const Nav = () => {
  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "Rutinas",
      path: "/dashboard/rutinas",
      icon: "ri-table-line",
    },
    {
      name: "Tu RM",
      path: "/dashboard/rm",
      icon: "ri-calculator-line",
    },
    {
      name: "Progreso",
      path: "/dashboard/progreso",
      icon: "ri-bar-chart-2-line",
    },
    {
      name: "Contacto",
      path: "/dashboard/contacto",
      icon: "ri-phone-line",
    },
  ]

  return (
    <header className="fixed top-0 left-0 w-full h-20">
      <nav className="w-full h-full">
        <div className="m-5">
          <i
            className={[
              "ri-menu-line",
              "text-2xl text-white font-semibold",
            ].join(" ")}
          />
        </div>
        <div className="fixed top-0 left-0 w-80 h-screen bg-[#161b22] rounded-r-2xl">
          <div className="absolute right-6 top-5">
            <i
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
                className="w-4/5 h-11 flex items-center justify-start hover:bg-[#ffffff2c] rounded-lg my-2 transition-all"
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
        </div>
      </nav>
    </header>
  )
}

export default Nav
