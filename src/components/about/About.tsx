import Image from "next/image"
import React from "react"

const About = () => {
  return (
    <section className="w-full h-max mt-20">
      <div className="w-full h-full flex flex-row items-center justify-center mb-10">
        <article className="w-1/2 h-full flex items-center justify-center flex-col gap-4">
          <h2 className="text-white text-4xl font-normal">
            Porque usar Tavross?
          </h2>
          <p className="text-center text-[#ffffff57] text-sm font-normal mx-[90px]">
            ¡Bienvenido a Tavross! Somos más que una página de gimnasio; somos
            tu compañero de confianza en el viaje hacia una vida más saludable y
            activa. En Tavross, nuestra misión es brindarte las herramientas y
            el apoyo que necesitas para alcanzar tus metas de acondicionamiento
            físico de manera efectiva y sostenible.
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
