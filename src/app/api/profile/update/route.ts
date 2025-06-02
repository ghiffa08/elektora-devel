import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import type { Session } from "next-auth"

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any) as Session | null
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name } = body

    // Validate input
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      )
    }    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user!.email
      },
      data: {
        name: name.trim()
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    })

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (error) {
    console.error("Profile update error:", error)
    
    // Handle Prisma errors
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
