import { mailOptions, transporter } from "@/lib/config/nodemailer"
import prismadb from "../../../lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    if (req.method !== "POST")
      return NextResponse.json(
        { message: "method not allowed" },
        { status: 405 }
      )

    const response = await req.json()

    const { name, email, password } = response

    const token = jwt.sign(
      {
        expiresIn: "2m",
        data: {
          name,
          email,
        },
      },
      process.env.SECRET!
    )

    const refreshToken = jwt.sign(
      {
        expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        data: {
          name,
          email,
        },
      },

      process.env.REFRESH_TOKEN!
    )

    const createToken = await prismadb.verificationToken.create({
      data: {
        identifier: email,
        token: refreshToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    })

    if (!createToken) {
      return NextResponse.json({ message: "error" }, { status: 500 })
    }

    try {
      await transporter
        .sendMail({
          ...mailOptions(email),
          subject: response.subject,
          text: "This is a text string",
          html: `
        <main style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          backgroundColor: "#f7f3f2",
        }}>
          <article style={{
            width: "300px",
            height: "400px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "#f3f3f3",
          }}>
            <h1 style={{
              fontSize: "3rem",
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Rubik",
            }}>
              Welcome to <span style={{ color: "#0ea5e9" }}> Tavross!🦾</span>
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#ffffff57" textAlign: "center" }}>Please confirm your email to finish creating your account.</p>
            <a href="https://tavross-final-version.vercel.app/verify/${token}" style={{
              fontSize: "0.955rem",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              backgroundColor: "#0ea5e9",
              textDecoration: "none",
            }}>Confirm email</a>
          </article>
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
