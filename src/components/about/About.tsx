import React from "react"
import {
  IconTable,
  IconTrendingUp,
  IconBrandUnity,
  IconBrain,
  IconCalculator,
  IconStretching,
} from "@tabler/icons-react"
import Card from "./Card"

const About = () => {
  const cardsInfo = [
    {
      title: "Models 3D",
      icon: <IconBrandUnity className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios y asi mejorar tu entrenamiento.",
      width: "w-[580px]",
      height: "h-[450px]",
      isBig: true,
    },
    {
      title: "Rutines",
      icon: <IconTable className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios.",
      width: "w-[240px]",
      height: "h-[450px]",
      isBig: false,
    },
    {
      title: "RM Calculator",
      icon: <IconCalculator className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios.",
      width: "w-[240px]",
      height: "h-[450px]",
      isBig: false,
    },
    {
      title: "Progress",
      icon: <IconTrendingUp className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios.",
      width: "w-[240px]",
      height: "h-[450px]",
      isBig: false,
    },
    {
      title: "Preloaded exercises",
      icon: <IconStretching className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios.",
      width: "w-[240px]",
      height: "h-[450px]",
      isBig: false,
    },
    {
      title: "Personal Improvements",
      icon: <IconBrain className="text-primary_green" />,
      description:
        "Los modelos 3D te permiten aprender sobre la tecnica de los ejercicios.",
      width: "w-[580px]",
      height: "h-[450px]",
      className: "",
      isBig: true,
    },
  ]
  return (
    <section className="w-full h-max flex items-center justify-center flex-col mt-24 bg-gradient-radial">
      <h2 className="text-text_gray font-semibold text-3xl mb-16">
        Why use <span className="text-primary_green">Tavross</span> instead
        other apps?
      </h2>
      <div className="w-full h-full flex flex-row items-center justify-center flex-wrap">
        {cardsInfo.map(
          ({ title, description, icon, width, height, isBig }, index) => (
            <Card
              key={index}
              {...{ index, title, description, icon, width, height, isBig }}
            />
          )
        )}
      </div>
    </section>
  )
}

export default About
