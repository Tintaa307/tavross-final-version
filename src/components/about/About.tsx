import Image from "next/image"
import React from "react"

const About = () => {
  return (
    <section className="w-full h-max mt-20">
      <div className="w-full h-full flex flex-row items-center justify-center mb-10">
        <article className="w-1/2 h-full flex items-center justify-center flex-col gap-4">
          <h2 className="text-white text-4xl font-normal">Why use Tavross?</h2>
          <p className="text-center text-[#ffffff57] text-sm font-normal mx-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, voluptates, quia voluptate quod quos
            voluptatibus quas doloribus quidem voluptas. Quisquam voluptatum,
            quibusdam, voluptates, quia voluptate quod quos voluptatibus quas
          </p>
        </article>
        <article className="w-1/2 h-full flex items-center justify-center">
          <Image
            src={"/david-laid.png"}
            alt="about-image"
            width={300}
            height={400}
            className="drop-shadow-custom"
          />
        </article>
      </div>
    </section>
  )
}

export default About
