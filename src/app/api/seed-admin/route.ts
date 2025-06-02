import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin user already exists" },
        { status: 400 }
      )
    }

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@elektora-team.com",
        role: "ADMIN"
      }
    })

    return NextResponse.json(
      { 
        message: "Admin user created successfully",
        user: { id: adminUser.id, name: adminUser.name, email: adminUser.email, role: adminUser.role }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating admin user:", error)
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}
