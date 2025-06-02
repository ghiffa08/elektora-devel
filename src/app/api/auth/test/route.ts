import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route"

interface UserSession {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}

interface SessionWithUser {
  user: UserSession;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any) as SessionWithUser | null
    
    if (!session || !session.user) {
      return NextResponse.json(
        { authenticated: false, message: "Not authenticated" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
      message: "Authentication successful"
    })
  } catch (error) {
    console.error("Auth test error:", error)
    return NextResponse.json(
      { error: "Authentication test failed" },
      { status: 500 }
    )
  }
}
