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
    role: string;
    avatar?: string;
  };
}

// Usuários fake para desenvolvimento
const FAKE_USERS = [
  {
    id: 1,
    email: 'admin@clinica360.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'medico@clinica360.com',
    password: 'medico123',
    name: 'Dr. João Silva',
    role: 'medico',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    email: 'enfermeiro@clinica360.com',
    password: 'enfermeiro123',
    name: 'Maria Santos',
    role: 'enfermeiro',
    avatar: 'https://images.unsplash.com/photo-1594824475545-9d0c7c4951c5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    email: 'recepcionista@clinica360.com',
    password: 'recepcionista123',
    name: 'Ana Costa',
    role: 'recepcionista',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  }
];

class FakeAuthService {
  private readonly TOKEN_KEY = 'clinica360_token';
  private readonly USER_KEY = 'clinica360_user';
  private readonly FAKE_TOKEN_PREFIX = 'fake_token_';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = FAKE_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token fake
    const fakeToken = this.FAKE_TOKEN_PREFIX + btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    }));

    const authResponse: AuthResponse = {
      access_token: fakeToken,
      token_type: 'Bearer',
      expires_in: 86400, // 24 horas em segundos
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar
      }
    };

    // Salvar no localStorage
    this.setToken(authResponse.access_token);
    this.setUser(authResponse.user);

    return authResponse;
  }

  async logout(): Promise<void> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Limpar dados locais
    this.clearAuth();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Verificar se é um token fake válido
      if (!token.startsWith(this.FAKE_TOKEN_PREFIX)) return false;
      
      const tokenData = JSON.parse(atob(token.replace(this.FAKE_TOKEN_PREFIX, '')));
      return tokenData.exp > Date.now();
    } catch {
      return false;
    }
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

  // Método para obter usuários disponíveis (apenas para desenvolvimento)
  getAvailableUsers() {
    return FAKE_USERS.map(user => ({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role
    }));
  }
}

export const fakeAuthService = new FakeAuthService();
