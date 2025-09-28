import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { Session, SessionDetails } from "../types/api";
import { sessionApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CreateSessionPrompt from "./elements/CreateSessionPrompt";

const ChatInterface: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isPromptOpen, setIsPromptOpen] = useState(false); 
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      loadSessions();
    }
  }, [token]);

  const loadSessions = async () => {
    if (!token) return;

    try {
      const sessionsData = await sessionApi.getSessions(token);
      setSessions(sessionsData);

      // If no current session and we have sessions, select the first one
      if (!currentSession && sessionsData.length > 0) {
        loadSession(sessionsData[0].id);
      } else if (sessionsData.length === 0) {
        setIsPromptOpen(true);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSession = async (sessionId: number) => {
    if (!token) return;

    try {
      const sessionData = await sessionApi.getSession(sessionId, token);
      setCurrentSession(sessionData);
    } catch (error) {
      console.error("Error loading session:", error);
    }
  };

  const handleNewSession = async (name:string) => {
    if (!token) return;

    try {
      const newSession = await sessionApi.createSession(name, token);
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSession({
        ...newSession,
        messages: [],
      });
    } catch (error) {
      console.error("Error creating new session:", error);
    }
  };

  const handleSessionSelect = (sessionId: number) => {
    loadSession(sessionId);
  };

  const handleMessagesUpdate = () => {
    if (currentSession) {
      loadSession(currentSession.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/25">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-white text-xl font-semibold">
            Loading DrishtiGPT...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Preparing your AI experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="flex w-full relative z-10">
        {/* Sidebar */}
        <div className="w-80 h-full">
          <Sidebar
            sessions={sessions}
            currentSessionId={currentSession?.id || null}
            onSessionSelect={handleSessionSelect}
            onNewSession={() => setIsPromptOpen(true)} 
            onSessionsUpdate={loadSessions}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 h-full" style={{display: "flex"}}>
          <ChatArea
            sessionId={currentSession?.id || null}
            messages={currentSession?.messages || []}
            onMessagesUpdate={handleMessagesUpdate}
          />
        </div>
      </div>

      <CreateSessionPrompt
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        onCreate={handleNewSession} 
      />

    </div>
  );
};

export default ChatInterface;
