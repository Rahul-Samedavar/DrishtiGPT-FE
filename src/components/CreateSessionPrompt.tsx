"use client"

import type React from "react"
import { useState } from "react"

interface CreateSessionPromptProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

const CreateSessionPrompt: React.FC<CreateSessionPromptProps> = ({ isOpen, onClose, onCreate }) => {
  const [sessionName, setSessionName] = useState("")

  const handleCreate = () => {
    if (sessionName.trim()) {
      onCreate(sessionName.trim())
      setSessionName("")
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-white text-lg font-semibold mb-4">Create New Session</h2>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="Enter session name"
          className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={handleCreate} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSessionPrompt
