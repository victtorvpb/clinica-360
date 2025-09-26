/// <reference types="vite/client" />

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    email: string;
    name: string;
    type_user: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at: string | null;
  };
}

class ApiService {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  private readonly TOKEN_KEY = 'clinica360_token';
  private readonly USER_KEY = 'clinica360_user';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Erro ao fazer login');
    }

    const authResponse: AuthResponse = await response.json();

    // Salvar no localStorage
    this.setToken(authResponse.access_token);
    this.setUser(authResponse.user);

    return authResponse;
  }

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch(`${this.API_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
        });
      } catch (error) {
        console.warn('Erro ao fazer logout no servidor:', error);
      }
    }
    
    // Limpar dados locais
    this.clearAuth();
  }

  async getCurrentUser(): Promise<any> {
    const response = await fetch(`${this.API_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao obter dados do usuário');
    }

    return response.json();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Método para verificar se a API está disponível
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // Método para obter a URL da API (para debug)
  getApiUrl(): string {
    return this.API_URL;
  }
}

export const apiService = new ApiService();
