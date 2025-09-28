import React from 'react';
import { ArrowLeft, Code, Book, ExternalLink, Copy, CheckCircle } from 'lucide-react';

interface APIDocumentationProps {
  onBack: () => void;
}

const APIDocumentation: React.FC<APIDocumentationProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">API Documentation</h1>
                <p className="text-gray-400">Build with DrishtiGPT's powerful APIs</p>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/25">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">API Documentation Coming Soon</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you comprehensive API documentation with examples, 
              SDKs, and integration guides. Stay tuned for powerful developer tools!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <Book className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Docs</h3>
                <p className="text-gray-400 text-sm">Detailed API reference with examples and use cases</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <Code className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">SDKs & Libraries</h3>
                <p className="text-gray-400 text-sm">Ready-to-use SDKs for popular programming languages</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <ExternalLink className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Integration Guides</h3>
                <p className="text-gray-400 text-sm">Step-by-step tutorials for common integrations</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2">Get Notified</h3>
              <p className="text-gray-400 text-sm mb-4">
                Want to be the first to know when our API documentation is ready?
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;