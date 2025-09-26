import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  type_user: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string | null;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const user = apiService.getUser();
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Erro ao inicializar autenticação',
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiService.login({ email, password });
      
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await apiService.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar o estado local
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    logout,
    clearError,
  };
};
