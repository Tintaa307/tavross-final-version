import React from "react"

const Loader = () => {
  return (
    <main className="w-full h-screen absolute top-0 left-0 z-30 flex items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full border-4 border-solid border-[#553AFD] border-l-transparent bg-transparent animate-spin"></div>
    </main>
  )
}

export default Loader
