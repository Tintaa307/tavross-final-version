import { PrismaClient } from "@prisma/client"

declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginValues {
  email: string
  password: string
}

export interface RegisterValues {
  name: string
  email: string
  password: string
}
