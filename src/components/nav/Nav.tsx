import Link from "next/link"
import React from "react"
import "remixicon/fonts/remixicon.css"

const Nav = () => {
  const navItems = [
    {
      name: "HOME",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "RUTINAS",
      path: "/dashboard/rutinas",
      icon: "ri-table-line",
    },
    {
      name: "TU RM",
      path: "/dashboard/rm",
      icon: "ri-calculator-line",
    },
    {
      name: "PROGRESO",
      path: "/dashboard/progreso",
      icon: "ri-bar-chart-2-line",
    },
    {
      name: "CONTACTO",
      path: "/dashboard/contacto",
      icon: "ri-phone-line",
    },
  ]

  return (
    <header className="">
      <nav className="">
        <div className="">
          <strong>Tavross</strong>
        </div>
        <div className="">
          <ul className="">
            {navItems.map((item, index) => (
              <li className="" key={index}>
                <i className={item.icon} />
                <Link className="" href={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav
