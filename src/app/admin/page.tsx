"use client"

import { useRequireAdmin } from "@/hooks/useAuth"
import { FaCrown, FaUsers, FaNewspaper, FaCog, FaChartLine } from "react-icons/fa"

export default function AdminDashboard() {
  const { user, isLoading } = useRequireAdmin()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // useRequireAdmin will redirect
  }

  const adminStats = [
    { icon: FaUsers, label: "Total Users", value: "150", color: "bg-blue-500" },
    { icon: FaNewspaper, label: "Published Articles", value: "42", color: "bg-green-500" },
    { icon: FaChartLine, label: "Monthly Views", value: "2.5K", color: "bg-purple-500" },
    { icon: FaCog, label: "Active Projects", value: "8", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <FaCrown className="text-yellow-500 text-2xl" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {user.name}! Manage your platform from here.
          </p>        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaUsers className="text-blue-500 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Management
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage user accounts and permissions
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Manage Users
            </button>
          </div>

          {/* Article Management */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaNewspaper className="text-green-500 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Article Management
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create, edit, and manage articles
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Manage Articles
            </button>
          </div>

          {/* System Settings */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaCog className="text-purple-500 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                System Settings
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Configure platform settings
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              Settings
            </button>
          </div>
        </div>        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  New user registration
                </span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Article published
                </span>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  System backup completed
                </span>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
