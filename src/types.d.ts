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
  terms?: boolean
}

export interface DecodedToken {
  expiresIn: string
  data: {
    name: string
    email: string
  }
  iat: number
}

export interface Rutine {
  id?: string
  name: string
  frequency: string
  category: string
  identifier?: string
}

export interface ExerciseListProps {
  name: string
  weight: number
  reps: number
  rutinesId?: number
}
