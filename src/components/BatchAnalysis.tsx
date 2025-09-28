import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileImage, X, Play, Download, Eye, Calendar, ArrowLeft, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { batchAnalysisApi } from '../services/api';
import { BatchAnalysis, BatchAnalysisDetails } from '../types/api';
import { API_BASE_URL } from '../services/api';

interface BatchAnalysisProps {
  onBack: () => void;
}

const BatchAnalysisPage: React.FC<BatchAnalysisProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<BatchAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<BatchAnalysisDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (activeTab === 'history') {
      loadAnalyses();
    }
  }, [activeTab]);

  const loadAnalyses = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const data = await batchAnalysisApi.listAnalyses(token);
      setAnalyses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!token || !title.trim() || !prompt.trim() || files.length === 0) return;

    setIsAnalyzing(true);
    setError('');

    try {
      await batchAnalysisApi.createAnalysis(title.trim(), prompt.trim(), files, token);
      setTitle('');
      setPrompt('');
      setFiles([]);
      setActiveTab('history');
      loadAnalyses();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewAnalysis = async (analysisId: number) => {
    if (!token) return;

    setIsLoading(true);
    try {
      const data = await batchAnalysisApi.getAnalysis(analysisId, token);
      setSelectedAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = async (analysisId: number, title: string) => {
    if (!token) return;

    try {
      await batchAnalysisApi.downloadAnalysis(analysisId, token);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (selectedAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">{selectedAnalysis.title}</h1>
                  <p className="text-gray-400 text-sm">
                    {selectedAnalysis.results.length} images analyzed • {formatDate(selectedAnalysis.created_at)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownloadCSV(selectedAnalysis.id, selectedAnalysis.title)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </button>
            </div>

            {/* Prompt */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Analysis Prompt</h3>
              <p className="text-gray-300 bg-gray-800/50 p-4 rounded-xl">{selectedAnalysis.prompt}</p>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {selectedAnalysis.results.map((result, index) => (
                <div key={result.id} className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">Image {index + 1}</h4>
                        <span className="text-xs text-gray-500">{formatDate(result.created_at)}</span>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-xl mb-4">
                        <p className="text-gray-300 whitespace-pre-wrap">{result.response}</p>
                      </div>
                      <a
                        href={`${result.file_url}?token=${token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Original Image
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <h1 className="text-3xl font-bold text-white">Batch Analysis</h1>
                <p className="text-gray-400">Analyze multiple images with custom prompts</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create Analysis
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Analysis History
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {activeTab === 'create' ? (
            <div className="space-y-8">
              {/* Create Analysis Form */}
              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Analysis</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Analysis Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Product Analysis, Document Review..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Analysis Prompt
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to analyze in the images..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 resize-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload Images
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600/50 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload images</p>
                      <p className="text-gray-600 text-sm">Supports JPG, PNG, GIF, WebP</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  {files.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Selected Images ({files.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300">
                              <FileImage className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-300 truncate text-center">{file.name}</p>
                              <p className="text-xs text-gray-500 text-center mt-1">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !title.trim() || !prompt.trim() || files.length === 0}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Images...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Analysis History */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading analyses...</p>
                </div>
              ) : analyses.length === 0 ? (
                <div className="text-center py-12">
                  <FileImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No analyses yet</p>
                  <p className="text-gray-600 text-sm mt-2">Create your first batch analysis to get started</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {analyses.map((analysis) => (
                    <div key={analysis.id} className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{analysis.title}</h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{analysis.prompt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(analysis.created_at)}
                            </div>
                            <div className="flex items-center">
                              <FileImage className="w-4 h-4 mr-1" />
                              {analysis.results_count} images
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleViewAnalysis(analysis.id)}
                            className="flex items-center px-4 py-2 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadCSV(analysis.id, analysis.title)}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            CSV
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchAnalysisPage;