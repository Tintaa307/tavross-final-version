import React from "react"
import { IconBarbell, IconBrandUnity } from "@tabler/icons-react"
import ButtonLanding from "./button-landing"

const Landing = () => {
  return (
    <main className="relative top-0 left-0 w-full h-screen flex items-center justify-center text-center flex-row z-10">
      <div className="w-full h-max flex items-center justify-center flex-col gap-2">
        <div className="">
          <h1 className="text-text_gray text-6xl font-normal flex flex-col justify-center items-center leading-tight select-none">
            Is not an application
            <span className="text-primary_green">It´s a life style</span>
          </h1>
        </div>
        <div className="w-1/3 flex justify-start items-start text-center">
          <p className="text-[#ffffff57] text-sm">
            At Tavross we are going to help you build your ideal body and
            maintain your health in very good condition.
          </p>
        </div>
        <article className="w-full flex items-center justify-center flex-row gap-8 mt-5">
          <ButtonLanding
            text="Start training"
            url="/dashboard/rutines"
            icon={<IconBarbell />}
            className="border-primary_light_green/80 bg-primary_dark_green/60 hover:bg-primary_dark_green"
          />
          <ButtonLanding
            text="View models"
            url="dashboard/models"
            icon={<IconBrandUnity />}
            className="border-primary_light_green/40 bg-primary_dark_green/10 hover:bg-primary_dark_green/20"
          />
        </article>
      </div>
    </main>
  )
}

export default Landing
