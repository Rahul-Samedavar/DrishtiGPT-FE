"use client"

import type React from "react"
import { useState } from "react"
import { User, FileText, Sparkles, Download, Copy, Check } from "lucide-react"
import type { Message } from "../types/api"
import { useAuth } from "../context/AuthContext"
import { API_BASE_URL } from "../services/api"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageBubbleProps {
  message: Message
  isLast: boolean
  isStreaming?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast, isStreaming = false }) => {
  const isUser = message.role === "user"
  const { token } = useAuth()
  const [isCopied, setIsCopied] = useState(false)

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyMessage = async () => {
    if (message.content) {
      try {
        await navigator.clipboard.writeText(message.content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy message:", err)
      }
    }
  }

  const renderFileAttachments = () => {
    if (!message.file_urls || message.file_urls.length === 0) return null

    return (
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {message.file_urls.map((fileUrl, index) => {
          const filePath = message.file_paths[index]
          const fileName = filePath.split("/").pop() || "Unknown file"
          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)

          if (isImage) {
            console.log("Image found")
            return (
              <a
                key={index}
                href={`${API_BASE_URL}${fileUrl}?token=${token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden border border-gray-600/30 hover:opacity-90 transition-opacity"
              >
                <img
                  src={`${API_BASE_URL}${fileUrl}?token=${token}`}
                  alt={fileName}
                  className="w-full h-auto object-cover"
                />
              </a>
            )
          } else {
            return (
              <a
                key={index}
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center space-x-3 p-2 bg-gray-900/50 rounded-lg border border-gray-600/30 hover:bg-gray-900 transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300 truncate">{fileName}</span>
                <Download className="w-4 h-4 text-gray-500 ml-auto" />
              </a>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-blue-600"
            : "bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500/50"
        }`}
      >
        {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? "flex flex-col items-end" : ""}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-lg group ${
            isUser
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-12 shadow-purple-500/25"
              : "bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-600/50 mr-12"
          } ${isLast ? "animate-in slide-in-from-bottom-2 duration-300" : ""}`}
        >
          {message.content && (
            <button
              onClick={copyMessage}
              className={`absolute top-2 ${isUser ? "left-2" : "right-2"} opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 ${
                isUser ? "hover:bg-white/20 text-purple-200" : "hover:bg-gray-700 text-gray-400"
              }`}
              title="Copy message"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          )}

          {/* Message Text (only if content exists) */}
          {message.content && (
          <div className={`${message.content ? "pt-6" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content || ""}</ReactMarkdown>
            {isStreaming && <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1 rounded-sm" />}
          </div>
          )}

          {/* File Attachments */}
          {renderFileAttachments()}

          {/* Timestamp */}
          <div className={`text-xs mt-2 font-medium text-right ${isUser ? "text-purple-200" : "text-gray-400"}`}>
            {formatTime(message.created_at)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
