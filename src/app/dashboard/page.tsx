"use client"

import Nav from "@/components/nav/Nav"
import { signOut, useSession } from "next-auth/react"
import React from "react"

const Dashboard = () => {
  const { data: session, status } = useSession()
  return (
    <main className="w-full h-[86.5vh] flex items-center justify-center text-center flex-col gap-2">
      <div className="">
        <h1 className="text-white text-6xl font-bold flex flex-col justify-center items-center leading-tight select-none">
          THE PERFECT PLACE TO
          <span className="special">SHAPE YOUR </span>
          IDEAL BODY
        </h1>
      </div>
      <div className="w-1/3 flex justify-start items-start text-center">
        <p className="text-[#ffffff57] text-sm">
          At Tavross we will help you build the body of your dreams and have
          better health and quality of life.
        </p>
      </div>
      <article className="w-full flex items-center justify-center flex-row gap-8 mt-5">
        <div className="">
          <button className="w-40 h-12 bg-blue-800 text-white font-normal rounded">
            Start Now <i className={["ri-arrow-right-line", ""].join(" ")} />
          </button>
        </div>
        <div className="">
          <button className="text-white font-light flex flex-row justify-center items-center gap-2 transition-all">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <i className={["ri-play-line", "font-thin text-xl"].join(" ")} />
            </div>
            Product Video
          </button>
        </div>
      </article>
      <div className="absolute w-44 h-10 border-2 border-blue-400 left-24 -rotate-6 flex items-center justify-center text-white rounded font-normal">
        #PROGRESS
      </div>
      <div className="absolute w-44 h-10 border-2 border-red top-36 right-16 rotate-6 flex items-center justify-center text-white rounded font-normal">
        #IMPROVEYOURSELF
      </div>
      <div className="absolute w-44 h-10 border-2 border-orange bottom-20 right-24 -rotate-6 flex items-center justify-center text-white rounded font-normal">
        #YOUARETHEBEST
      </div>
    </main>
  )
}

export default Dashboard
