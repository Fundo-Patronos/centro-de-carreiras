// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
  user: { email: string; username: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: { email: string; username: string }, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      
      // Função para fazer login e armazenar tokens
      login: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
        });
      },

      // Função para logout
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      },

      // Atualiza o token de acesso
      setAccessToken: (accessToken) => {
        set((state) => ({
          ...state,
          accessToken,
        }));
      },

      // Lógica de renovação de token utilizando o refresh token
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        try {
          const response = await axios.post('/api/refresh-token', { refreshToken });
          set({ accessToken: response.data.accessToken });
        } catch (error) {
          console.error('Failed to refresh access token', error);
          set({ user: null, accessToken: null, refreshToken: null });
        }
      },
    }),
    {
      name: 'auth-storage', // Armazena dados de autenticação no localStorage
    }
  )
);

// Interceptor do Axios para renovação automática do token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshAccessToken, accessToken } = useAuthStore.getState();
    if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
      try {
        await refreshAccessToken(); // Renova o token
        error.config.__isRetryRequest = true;
        error.config.headers['Authorization'] = `Bearer ${accessToken}`; // Reenvia com o novo token
        return axios(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
