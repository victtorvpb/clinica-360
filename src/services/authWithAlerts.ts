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
  };
}

class AuthServiceWithAlerts {
  private readonly API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
  private readonly TOKEN_KEY = 'clinica360_token';
  private readonly USER_KEY = 'clinica360_user';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data: AuthResponse = await response.json();
      
      // Salvar token e dados do usuário no localStorage
      this.setToken(data.access_token);
      this.setUser(data.user);
      
      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Aqui você pode usar o hook useAlert em um componente React
      // ou criar uma função utilitária para mostrar alertas
      this.showErrorAlert('Erro no login. Verifique suas credenciais e tente novamente.');
      
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Chamar endpoint de logout se necessário
      const token = this.getToken();
      if (token) {
        await fetch(`${this.API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      this.showErrorAlert('Erro ao fazer logout. Tente novamente.');
    } finally {
      // Limpar dados locais
      this.clearAuth();
      this.showSuccessAlert('Logout realizado com sucesso!');
    }
  }

  // Método para mostrar alertas de erro
  private showErrorAlert(message: string): void {
    // Importação dinâmica para evitar problemas de SSR
    import('react-toastify').then(({ toast }) => {
      toast.error(message);
    }).catch(() => {
      // Fallback para console se react-toastify não estiver disponível
      console.error(message);
    });
  }

  // Método para mostrar alertas de sucesso
  private showSuccessAlert(message: string): void {
    import('react-toastify').then(({ toast }) => {
      toast.success(message);
    }).catch(() => {
      console.log(message);
    });
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

  // Método para obter headers de autorização para requisições
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export const authServiceWithAlerts = new AuthServiceWithAlerts();
