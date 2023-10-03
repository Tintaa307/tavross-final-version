"use client"

import { motion } from "framer-motion"

const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(71, 215, 150, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(71, 215, 150, 1)",
  },
}

const ProgressContent = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[url('/grid-pattern.svg')] bg-cover bg-center bg-no-repeat">
      <div className="">
        <motion.svg
          className="drop-shadow-[0_0_10px_#3fcf8e] animate-bounce"
          width="93"
          height="74"
          viewBox="0 0 93 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M2 72L46 28"
            stroke="#3FCF8E"
            stroke-width="3"
            stroke-linecap="round"
          />
          <motion.path
            d="M50.8999 41.9804C50.3367 42.5879 50.3728 43.537 50.9804 44.1001C51.5879 44.6633 52.537 44.6272 53.1001 44.0196L50.8999 41.9804ZM91.4989 1.94308C91.4675 1.11525 90.7709 0.469643 89.9431 0.50108L76.4528 1.01337C75.625 1.04481 74.9794 1.74138 75.0108 2.56921C75.0422 3.39704 75.7388 4.04264 76.5666 4.01121L88.558 3.55584L89.0134 15.5472C89.0448 16.375 89.7414 17.0206 90.5692 16.9892C91.397 16.9578 92.0426 16.2612 92.0112 15.4334L91.4989 1.94308ZM53.1001 44.0196L91.1001 3.01965L88.8999 0.980352L50.8999 41.9804L53.1001 44.0196Z"
            fill="#3FCF8E"
          />
          <motion.path
            d="M46 28L52 43"
            stroke="#3FCF8E"
            stroke-width="3"
            stroke-linecap="round"
          />
        </motion.svg>
      </div>
    </div>
  )
}

export default ProgressContent
