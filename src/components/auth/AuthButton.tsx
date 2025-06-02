"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { FaUser, FaSignOutAlt, FaSignInAlt, FaCrown } from "react-icons/fa"
import Image from "next/image"

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-600 text-sm" />
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {session.user?.name}
            </p>
            <div className="flex items-center space-x-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(session.user as any)?.role}
              </p>
              {(session.user as any)?.role === "ADMIN" && (
                <FaCrown className="text-yellow-500 text-xs" />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaSignOutAlt />
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn()}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
    >
      <FaSignInAlt />
      <span>Sign In</span>
    </button>
  )
}
