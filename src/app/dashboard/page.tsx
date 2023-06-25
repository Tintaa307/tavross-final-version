"use client"

import Nav from "@/components/nav/Nav"
import Loader from "@/components/shared/Loader"
import { signOut, useSession } from "next-auth/react"
import React from "react"
import { statusAuth } from "@/objects/status"
import Posts from "@/components/posters/Posts"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const { status } = useSession()
  const { LOADING } = statusAuth
  const router = useRouter()

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
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
                Start Now{" "}
                <i className={["ri-arrow-right-line", ""].join(" ")} />
              </button>
            </div>
            <div className="">
              <button
                onClick={() => router.push("/video")}
                className="text-white font-light flex flex-row justify-center items-center gap-2 transition-all"
              >
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <i
                    className={["ri-play-line", "font-thin text-xl"].join(" ")}
                  />
                </div>
                Product Video
              </button>
            </div>
          </article>
          <Posts
            message="#PROGRESS"
            color="border-blue-400"
            position="left-24"
          />
          <Posts
            message="#YOUARETHEBEST"
            color="border-orange"
            position="bottom-20 right-24"
          />
          <Posts
            message="#IMPROVEYOURSELF"
            color="border-red"
            position="top-36 right-16"
          />
        </main>
      )}
    </>
  )
}

export default Dashboard

//bottom-20 right-24 top-36 right-16
