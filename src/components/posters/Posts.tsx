import React from "react"

interface PostsProps {
  color: string
  message: string
  position: string
}

const Posts = ({ color, message, position }: PostsProps) => {
  return (
    <div
      className={[
        "absolute w-44 h-10 border-2 -rotate-6 flex items-center justify-center text-white rounded font-normal",
        color,
        position,
      ].join(" ")}
    >
      {message}
    </div>
  )
}

export default Posts
