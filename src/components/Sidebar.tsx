"use client"

import type React from "react"
import { useState } from "react"
import { Plus, MessageSquare, Trash2, LogOut, User, Sparkles, Settings, Crown } from "lucide-react"
import type { Session } from "../types/api"
import { sessionApi } from "../services/api"
import { useAuth } from "../context/AuthContext"

interface SidebarProps {
  sessions: Session[]
  currentSessionId: number | null
  onSessionSelect: (sessionId: number) => void
  onNewSession: () => void
  onSessionsUpdate: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onSessionsUpdate,
}) => {
  const { user, logout, token } = useAuth()
  const [deletingSessionId, setDeletingSessionId] = useState<number | null>(null)

  const handleDeleteSession = async (sessionId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!token) return

    setDeletingSessionId(sessionId)
    try {
      await sessionApi.deleteSession(sessionId, token)
      onSessionsUpdate()
      if (currentSessionId === sessionId) {
        // If we deleted the current session, create a new one
        onNewSession()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
    } finally {
      setDeletingSessionId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="h-full bg-gray-900/90 backdrop-blur-xl border-r border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold">DrishtiGPT</h2>
            <p className="text-gray-500 text-sm">AI Assistant</p>
          </div>
        </div>

        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSessionSelect(session.id)}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                currentSessionId === session.id
                  ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/40 shadow-lg"
                  : "hover:bg-gray-800/50 border border-transparent hover:border-gray-600/30"
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <MessageSquare
                  className={`w-4 h-4 flex-shrink-0 ${
                    currentSessionId === session.id ? "text-purple-400" : "text-gray-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      currentSessionId === session.id ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {session.title}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{formatDate(session.created_at)}</p>
                </div>
              </div>

              <button
                onClick={(e) => handleDeleteSession(session.id, e)}
                disabled={deletingSessionId === session.id}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all duration-200 flex-shrink-0"
              >
                {deletingSessionId === session.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <p className="text-white text-sm font-semibold">{user?.username}</p>
                <Crown className="w-3 h-3 text-yellow-400" />
              </div>
              <p className="text-emerald-400 text-xs flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1 animate-pulse"></div>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 text-gray-500 hover:text-white transition-colors duration-200" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors duration-200"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
