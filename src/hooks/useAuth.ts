"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface UserWithRole {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export function useAuth(requiredRole?: "ADMIN" | "USER") {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/signin")
      return
    }

    // Only check role if a specific role is required AND it's for admin access
    if (requiredRole === "ADMIN" && (session.user as UserWithRole)?.role !== "ADMIN") {
      router.push("/") // Redirect to home if not admin
      return
    }
  }, [session, status, requiredRole, router])

  return {
    user: session?.user as UserWithRole | undefined,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    isAdmin: (session?.user as UserWithRole)?.role === "ADMIN",
  }
}

export function useRequireAuth(requiredRole?: "ADMIN" | "USER") {
  return useAuth(requiredRole)
}

export function useRequireAdmin() {
  return useAuth("ADMIN")
}
