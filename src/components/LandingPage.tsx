import React from 'react';
import { MessageSquare, Code, Images, Brain, Sparkles, Zap, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onStartChatting: () => void;
  onBatchAnalysis: () => void;
  onAPIDocumentation: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onStartChatting,
  onBatchAnalysis,
  onAPIDocumentation,
}) => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Intelligent Conversations',
      description: 'Engage in natural, context-aware conversations with advanced AI',
    },
    {
      icon: Images,
      title: 'Batch Image Analysis',
      description: 'Analyze multiple images simultaneously with custom prompts',
    },
    {
      icon: Code,
      title: 'Developer API',
      description: 'Integrate DrishtiGPT capabilities into your applications',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security',
    },
  ];

  const stats = [
    { number: '10M+', label: 'Messages Processed' },
    { number: '500K+', label: 'Images Analyzed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Languages Supported' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-600/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/6 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DrishtiGPT</h1>
                <p className="text-sm text-gray-400">AI-Powered Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-emerald-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-purple-400" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Next-Generation
                </span>
                <br />
                <span className="text-white">AI Platform</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Experience the future of AI interaction with DrishtiGPT. From intelligent conversations 
                to batch image analysis, unlock the power of advanced artificial intelligence.
              </p>
            </div>

            {/* Main Action Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              {/* Start Chatting */}
              <div 
                onClick={onStartChatting}
                className="group bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start Chatting</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Engage in intelligent conversations with our advanced AI. Upload files, ask questions, 
                  and get comprehensive responses in real-time.
                </p>
                <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="font-semibold">Begin Conversation</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Batch Analysis */}
              <div 
                onClick={onBatchAnalysis}
                className="group bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                  <Images className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Batch Analysis</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Analyze multiple images simultaneously with custom prompts. Perfect for bulk processing 
                  and data extraction workflows.
                </p>
                <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span className="font-semibold">Analyze Images</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* API Documentation */}
              <div 
                onClick={onAPIDocumentation}
                className="group bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Build with DrishtiGPT</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Integrate our powerful AI capabilities into your applications with our comprehensive 
                  API documentation and SDKs.
                </p>
                <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="font-semibold">View Documentation</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-gray-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover what makes DrishtiGPT the ultimate AI platform for businesses and developers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who are already leveraging the power of DrishtiGPT
              </p>
              <button
                onClick={onStartChatting}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">DrishtiGPT</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 DrishtiGPT. Empowering the future with artificial intelligence.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;