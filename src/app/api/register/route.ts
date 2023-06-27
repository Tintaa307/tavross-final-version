import { mailOptions, transporter } from "@/lib/config/nodemailer"
import prismadb from "../../../lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    const response = await req.json()

    const { name, email, password } = response

    try {
      await transporter
        .sendMail({
          ...mailOptions(email),
          subject: response.subject,
          text: "This is a text string",
          html: `
        <main className="w-full h-screen bg-white flex items-center justify-center flex-col text-justify">
          <h1 className="font-normal text-black text-lg">Welcome to <span className="font-bold"> Tavross!</span></h1>
          <p className="text-sm text-[#ffffff57]">Please confirm your email to finish creating your account.</p>
          <a href="#" className="text-sm text-blue-600 underline">Confirm email</a>
        </main>`,
        })
        .then((response) => {
          console.log(response)
        })

      const existingUser = await prismadb.user.findUnique({
        where: {
          email: email,
        },
      })

      if (existingUser) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 400 }
        )
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await prismadb.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          image: "",
        },
      })

      return NextResponse.json(
        { message: "email sent", data: newUser },
        { status: 200 }
      )
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "error" + error }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ message: "error" + error }, { status: 500 })
  }
}
