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

export interface UserWithRole extends User {
  role: "USER" | "ADMIN"
}

// NextAuth.js module augmentation
declare module "next-auth" {
  interface Session {
    user: AuthUser
  }  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends AuthUser {
    /** 
     * NextAuth User interface extending AuthUser
     * This interface inherits all properties from AuthUser
     * and is used by NextAuth for user session management
     */
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string
    role: "USER" | "ADMIN"
  }
}
