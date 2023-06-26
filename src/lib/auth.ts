import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prismadb from "./db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { User as UserModel } from "@prisma/client"
import EmailProvider, { EmailConfig } from "next-auth/providers/email"
import nodemailer from "nodemailer"

declare module "next-auth" {
  interface User extends UserModel {
    id: number // <- here it is
  }
}

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Google credentials")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Google credentials")
  }

  return {
    clientId,
    clientSecret,
  }
}

export const sendVerificationRequest1: EmailConfig["sendVerificationRequest"] =
  async ({ identifier: email, url, provider: { server } }) => {
    console.log("sendVerificationRequest", email, url, server)
    const { host } = new URL(url)
    const transport = nodemailer.createTransport(server)
    const generateEmailArgs = { url, host, email }
    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      text: generateTextEmail(generateEmailArgs),
      html: generateHtmlEmail(generateEmailArgs),
    })
  }

type GenerateEmailArgs = {
  url: string
  host: string
  email: string
}

export const generateTextEmail = ({ url, host }: GenerateEmailArgs) =>
  `Sign in to ${host}\n${url}`

export const generateHtmlEmail = ({ url, host }: GenerateEmailArgs) => {
  const siteName = host.replace(/^https?:\/\//, "")
  return `
    <main className="w-full h-screen bg-white flex items-center justify-center flex-col text-justify">
      <h1 className="font-normal text-black text-lg">Welcome to <span className="font-bold"> Tavross!</span></h1>
      <p className="text-sm text-[#ffffff57]">Please confirm your email to finish creating your account.</p>
      <a href=${url} className="text-sm text-blue-600 underline">Confirm email</a>
    </main>
  `
}

export const sendVerificationRequest: EmailConfig["sendVerificationRequest"] =
  async ({ identifier: email, url, provider: { server } }) => {
    console.log("sendVerificationRequest", email, url, server)
    const { host } = new URL(url)
    const transport = nodemailer.createTransport(server)
    const generateEmailArgs = { url, host, email }
    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      text: generateTextEmail(generateEmailArgs),
      html: generateHtmlEmail(generateEmailArgs),
    })
  }

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    EmailProvider({
      id: "email",
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h),
      sendVerificationRequest,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error("No se encontro el usuario")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password!
        )

        if (!isCorrectPassword) {
          throw new Error("El email y/0 contraseña son invalidos")
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbResult = await prismadb.user.findUnique({
        where: {
          email: token.email!,
        },
      })

      if (!dbResult) {
        if (user) {
          token.email = user!.email
        }

        return token
      }

      return {
        id: dbResult.id,
        name: dbResult.name,
        email: dbResult.email,
        picture: dbResult.image,
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user!.name = token.name
        session.user!.email = token.email
        session.user!.image = token.picture
      }

      return session
    },
  },
}
