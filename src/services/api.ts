import { AuthResponse, Session, SessionDetails, StreamingResponse, BatchAnalysis, BatchAnalysisDetails } from '../types/api';

export const API_BASE_URL = 'http://localhost:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new ApiError(response.status, errorData.detail || 'An error occurred');
  }
  return response.json();
};

export const authApi = {
  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },
};

export const sessionApi = {
  async createSession(title: string, token: string): Promise<Session> {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    return handleResponse(response);
  },

  async getSessions(token: string): Promise<Session[]> {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async getSession(sessionId: number, token: string): Promise<SessionDetails> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async deleteSession(sessionId: number, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new ApiError(response.status, errorData.detail || 'An error occurred');
    }
  },
};

export const chatApi = {
  async sendMessage(
    sessionId: number,
    messageText: string,
    files: File[],
    token: string,
    onChunk: (chunk: StreamingResponse) => void
  ): Promise<void> {
    const formData = new FormData();
    formData.append('message_text', messageText);
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new ApiError(response.status, errorData.detail || 'An error occurred');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6));
            onChunk(data);
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  },
};


export const batchAnalysisApi = {
  async createAnalysis(title: string, prompt: string, files: File[], token: string): Promise<{ message: string; analysis_id: number }> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('prompt', prompt);
    formData.append('base_url', API_BASE_URL);
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/bunch_analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  async listAnalyses(token: string): Promise<BatchAnalysis[]> {
    const response = await fetch(`${API_BASE_URL}/list_analyses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async getAnalysis(analysisId: number, token: string): Promise<BatchAnalysisDetails> {
    const response = await fetch(`${API_BASE_URL}/get_analysis/${analysisId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async downloadAnalysis(analysisId: number, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/download_analysis/${analysisId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new ApiError(response.status, errorData.detail || 'An error occurred');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `analysis_${analysisId}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};