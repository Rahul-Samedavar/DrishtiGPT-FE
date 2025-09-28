export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user_id: number;
  username: string;
}

export interface Session {
  id: number;
  title: string;
  created_at: string;
}

export interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  file_paths: string[];
  file_urls: string[]; 
  created_at: string;
}

export interface SessionDetails extends Session {
  messages: Message[];
}

export interface StreamingResponse {
  content: string;
  done: boolean;
}