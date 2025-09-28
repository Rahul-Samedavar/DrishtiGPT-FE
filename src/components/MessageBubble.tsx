import React from 'react';
import { User, Image as ImageIcon, FileText, Sparkles, Download } from 'lucide-react';
import { Message } from '../types/api';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
  isStreaming?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast, isStreaming = false }) => {
  const isUser = message.role === 'user';
  const {token} = useAuth();
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // ---- MODIFICATION START ----
  // This function is updated to render images and file links from `file_urls`.
  const renderFileAttachments = () => {
    // Check for `file_urls` instead of `file_paths`
    if (!message.file_urls || message.file_urls.length === 0) return null;

    return (
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {message.file_urls.map((fileUrl, index) => {
          // Use file_paths to get the original filename, assuming the arrays correspond
          const filePath = message.file_paths[index];
          const fileName = filePath.split('/').pop() || 'Unknown file';
          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
          
          if (isImage) {
            console.log("mage found")
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
            );
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
            );
          }
        })}
      </div>
    );
  };
  // ---- MODIFICATION END ----

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
        isUser 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
          : 'bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500/50'
      }`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`relative px-4 py-3 rounded-2xl shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-12 shadow-purple-500/25'
            : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-600/50 mr-12'
        } ${isLast ? 'animate-in slide-in-from-bottom-2 duration-300' : ''}`}>
          
          {/* Message Text (only if content exists) */}
          {message.content && (
            <div className={`whitespace-pre-wrap ${isStreaming ? 'animate-pulse' : ''}`}>
              {message.content}
              {isStreaming && <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1 rounded-sm" />}
            </div>
          )}

          {/* File Attachments */}
          {renderFileAttachments()}

          {/* Timestamp */}
          <div className={`text-xs mt-2 font-medium text-right ${
            isUser ? 'text-purple-200' : 'text-gray-400'
          }`}>
            {formatTime(message.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;