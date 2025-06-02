"use client"

import { useRequireAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { FaUser, FaCrown, FaCalendar, FaEnvelope, FaEdit, FaSave, FaTimes, FaCog, FaLock } from "react-icons/fa"
import Image from "next/image"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const { user, isLoading, isAdmin } = useRequireAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: ""
  })

  // Update form when user data is available
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || ""
      })
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-elektora-blue"></div>
      </div>
    )
  }

  if (!user) {
    return null // useRequireAuth will redirect
  }

  const handleSave = async () => {
    if (!editForm.name.trim()) {
      toast.error("Name is required")
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
      })

      if (response.ok) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
        // Optionally refresh the page or update user context
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("An error occurred while updating profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || ""
    })
    setIsEditing(false)
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-elektora-blue to-elektora-purple px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center border-4 border-white">
                    <FaUser className="text-gray-600 text-2xl" />
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold text-white">
                      {user.name || "User"}
                    </h1>
                    {isAdmin && (
                      <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-medium">
                        <FaCrown className="text-xs" />
                        <span>Admin</span>
                      </div>
                    )}
                  </div>                  <p className="text-blue-100">
                    {user?.role || "USER"} Member
                  </p><p className="text-blue-200 text-sm">
                    Member since {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-6 py-8">
            {isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Edit Profile Information
                  </h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      disabled={isSaving}
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-elektora-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      <FaSave />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elektora-blue focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                      placeholder="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be modified</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="bg-elektora-blue/10 p-2 rounded-lg">
                        <FaEnvelope className="text-elektora-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="bg-elektora-purple/10 p-2 rounded-lg">
                        <FaUser className="text-elektora-purple" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Role</p>
                        <div className="flex items-center space-x-2">                          <p className="font-medium text-gray-900 dark:text-white">
                            {user?.role || "USER"}
                          </p>
                          {isAdmin && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Administrator
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <FaCalendar className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-elektora-blue/5 to-elektora-purple/5 rounded-lg p-6 border border-elektora-blue/20">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <FaCog className="text-elektora-blue" />
                        <span>Account Statistics</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Profile Completion</span>
                          <span className="font-medium text-elektora-blue">
                            {user.name && user.email ? "100%" : "75%"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Login Method</span>
                          <span className="font-medium">
                            {user.image ? "Google OAuth" : "Manual"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="bg-gradient-to-br from-purple-50 to-yellow-50 dark:from-purple-900/20 dark:to-yellow-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <FaLock className="text-purple-600" />
                          <span>Admin Privileges</span>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          You have administrative access to manage the platform.
                        </p>
                        <a
                          href="/admin"                          className="bg-elektora-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
                        >
                          <FaLock />
                          <span>Access Admin Panel</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
