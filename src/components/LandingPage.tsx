"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Code,
  ImageIcon,
  Brain,
  Sparkles,
  Zap,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import AnimatedNetwork from "./AnimatedNetwork";

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
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "Intelligent Conversations",
      description:
        "Engage in natural, context-aware conversations with advanced AI",
    },
    {
      icon: ImageIcon,
      title: "Batch Image Analysis",
      description: "Analyze multiple images simultaneously with custom prompts",
    },
    {
      icon: Code,
      title: "Developer API",
      description: "Integrate DrishtiGPT capabilities into your applications",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is encrypted and protected with enterprise-grade security",
    },
  ];

  const stats = [
    { number: "10M+", label: "Messages Processed" },
    { number: "500K+", label: "Images Analyzed" },
    { number: "99.9%", label: "Uptime" },
    { number: "50+", label: "Languages Supported" },
  ];

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );

  const AnimatedGrid = () => (
    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translate(${mousePosition.x * 0.01}px, ${
            mousePosition.y * 0.01
          }px)`,
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      <AnimatedNetwork nodeCount={60} maxConnections={3} animationSpeed={0.3} />

      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <AnimatedGrid />
        <FloatingParticles />

        {/* Enhanced floating orbs with more complex animations */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/12 rounded-full blur-3xl animate-pulse-slow opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600/12 rounded-full blur-3xl animate-bounce-slow delay-1000 opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-600/12 rounded-full blur-3xl animate-pulse-slow delay-500 opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-spin-slow delay-700 opacity-60"></div>

        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-purple-500/20 via-transparent to-blue-500/20 animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <header
          className="px-6 py-8 backdrop-blur-sm"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 animate-glow">
                <Brain className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white animate-fade-in">
                  DrishtiGPT
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in-delay">
                  AI-Powered Intelligence Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center animate-fade-in-delay-2">
                  <Shield className="w-4 h-4 mr-1 text-emerald-400 animate-pulse" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center animate-fade-in-delay-3">
                  <Sparkles className="w-4 h-4 mr-1 text-purple-400 animate-spin-slow" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center animate-fade-in-delay-4">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 animate-twinkle" />
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  Next-Generation
                </span>
                <br />
                <span className="text-white animate-slide-up-delay">
                  AI Platform
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
                Experience the future of AI interaction with DrishtiGPT. From
                intelligent conversations to batch image analysis, unlock the
                power of advanced artificial intelligence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">

              {/* Start Chatting */}
              <div className="group perspective">
                <div className="tilt-card h-full">
                  <div
                    onClick={onStartChatting}
                    className="group bg-gray-900/80 h-full flex flex-col backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-card-float hover:rotate-1"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-500 group-hover:animate-bounce-gentle">
                      <MessageSquare className="w-8 h-8 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      Start Chatting
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                      Engage in intelligent conversations with our advanced AI.
                      Upload files, ask questions, and get comprehensive
                      responses in real-time.
                    </p>
                    <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span className="font-semibold">Begin Conversation</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 group-hover:animate-pulse transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Batch Analysis */}
              <div className="group perspective">
                <div className="tilt-card h-full">
                  <div
                    onClick={onBatchAnalysis}
                    className="group bg-gray-900/80 h-full flex flex-col backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 animate-card-float-delay hover:-rotate-1"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-500 group-hover:animate-bounce-gentle">
                      <ImageIcon className="w-8 h-8 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                      Batch Analysis
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                      Analyze multiple images simultaneously with custom
                      prompts. Perfect for bulk processing and data extraction
                      workflows.
                    </p>
                    <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      <span className="font-semibold">Analyze Images</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 group-hover:animate-pulse transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* API Documentation */}

              <div className="group perspective">
                <div className="tilt-card h-full">
                  <div
                    onClick={onAPIDocumentation}
                    className="group bg-gray-900/80 h-full flex flex-col backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-card-float-delay-2 hover:rotate-1"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-500 group-hover:animate-bounce-gentle">
                      <Code className="w-8 h-8 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      Build with DrishtiGPT
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                      Integrate our powerful AI capabilities into your
                      applications with our comprehensive API documentation and
                      SDKs.
                    </p>
                    <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span className="font-semibold">View Documentation</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 group-hover:animate-pulse transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 animate-count-up">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="px-6 py-20 bg-gray-900/30 backdrop-blur-sm relative"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
                Discover what makes DrishtiGPT the ultimate AI platform for
                businesses and developers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-500 group hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 group-hover:animate-pulse transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-3xl p-12 relative overflow-hidden group hover:from-purple-600/15 hover:to-blue-600/15 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 animate-fade-in-up">
                  Join thousands of users who are already leveraging the power
                  of DrishtiGPT
                </p>
                <button
                  onClick={onStartChatting}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-500 animate-glow-pulse group-hover:animate-bounce-gentle"
                >
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-glow">
                <Brain className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-lg font-semibold text-white">
                DrishtiGPT
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 DrishtiGPT. Empowering the future with artificial
              intelligence.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
