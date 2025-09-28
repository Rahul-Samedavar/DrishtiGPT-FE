import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import ChatInterface from './components/ChatInterface';
import LandingPage from './components/LandingPage';
import BatchAnalysis from './components/BatchAnalysis';
import APIDocumentation from './components/APIDocumentation';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'chat' | 'batch' | 'api' | 'auth'>('landing');

  const handleStartChatting = () => {
    if (isAuthenticated) {
      setCurrentPage('chat');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleBatchAnalysis = () => {
    if (isAuthenticated) {
      setCurrentPage('batch');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleAPIDocumentation = () => {
    setCurrentPage('api');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  // If user is authenticated and on auth page, redirect to appropriate page
  React.useEffect(() => {
    if (isAuthenticated && currentPage === 'auth') {
      setCurrentPage('chat');
    }
  }, [isAuthenticated, currentPage]);

  switch (currentPage) {
    case 'landing':
      return (
        <LandingPage
          onStartChatting={handleStartChatting}
          onBatchAnalysis={handleBatchAnalysis}
          onAPIDocumentation={handleAPIDocumentation}
        />
      );
    case 'chat':
      return isAuthenticated ? <ChatInterface /> : <AuthPage />;
    case 'batch':
      return isAuthenticated ? <BatchAnalysis onBack={handleBackToLanding} /> : <AuthPage />;
    case 'api':
      return <APIDocumentation onBack={handleBackToLanding} />;
    case 'auth':
      return <AuthPage />;
    default:
      return (
        <LandingPage
          onStartChatting={handleStartChatting}
          onBatchAnalysis={handleBatchAnalysis}
          onAPIDocumentation={handleAPIDocumentation}
        />
      );
  }
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;