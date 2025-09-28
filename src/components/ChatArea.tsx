import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  X,
  Image,
  FileText,
  Sparkles,
  Zap,
} from "lucide-react";
import { Message } from "../types/api";
import MessageBubble from "./MessageBubble";
import { chatApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface ChatAreaProps {
  sessionId: number | null;
  messages: Message[];
  onMessagesUpdate: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  sessionId,
  messages,
  onMessagesUpdate,
}) => {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || !sessionId || !token || isStreaming) return;

    const messageText = input.trim();

    onMessagesUpdate();
    setInput("");
    setIsStreaming(true);
    setStreamingMessage("");

    try {
      await chatApi.sendMessage(
        sessionId,
        messageText,
        files,
        token,
        (chunk) => {
          if (chunk.content) {
            setStreamingMessage((prev) => prev + chunk.content);
          }
          if (chunk.done) {
            setIsStreaming(false);
            setStreamingMessage("");
            onMessagesUpdate();
          }
        }
      );
      setFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  if (!sessionId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to DrishtiGPT
          </h3>
          <p className="text-gray-500 text-lg mb-6">
            Start a new conversation to begin chatting with AI
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm">Lightning Fast</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 to-black relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isDragOver && (
        <div className="absolute inset-0 bg-purple-600/20 backdrop-blur-sm flex items-center justify-center z-50 border-2 border-dashed border-purple-400">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Paperclip className="w-8 h-8 text-white" />
            </div>
            <p className="text-white text-xl font-bold">
              Drop files here to upload
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Images and documents supported
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {/* ---- MODIFICATION START ---- */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {/* This spacer div pushes the content below it to the bottom */}
        <div className="mt-auto" />
        <div className="space-y-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))}

          {isStreaming && streamingMessage && (
            <MessageBubble
              message={{
                id: -1,
                content: streamingMessage,
                role: "assistant",
                file_paths: [],
                file_urls: [],
                created_at: new Date().toISOString(),
              }}
              isLast={true}
              isStreaming={true}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* ---- MODIFICATION END ---- */}

      {/* Input Area */}
      <div className="p-6 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        {files.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/50"
                >
                  {getFileIcon(file)}
                  <span className="text-sm text-white truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-600/50 p-4 shadow-xl">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
                rows={1}
                style={{ minHeight: "20px", maxHeight: "120px" }}
              />

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-700/50"
                  title="Attach files"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-6 py-2 font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center"
                >
                  {isStreaming ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isStreaming ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,*"
      />
    </div>
  );
};

export default ChatArea;
