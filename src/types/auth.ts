import { User } from "@prisma/client"

export interface AuthUser extends User {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "USER" | "ADMIN"
}

export interface AuthSession {
  user: AuthUser
  expires: string
}

export interface AuthError {
  error: string
  description?: string
  url?: string
}

// NextAuth.js module augmentation
declare module "next-auth" {
  interface Session {
    user: AuthUser
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string
    role: "USER" | "ADMIN"
  }
}
