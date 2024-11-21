import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthState {
  user: { email: string; user_name: string} | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (_user: { email: string; user_name: string}, _accessToken: string, _refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (_accessToken: string) => void;
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
          const response = await axios.post('/api/refresh-token', { refreshToken }, { withCredentials: true });
          const newAccessToken = response.data.accessToken;

          // Atualiza o estado global com o novo token de acesso
          set({ accessToken: response.data.accessToken });

         // Atualiza o token de acesso também no cookie
          Cookies.set(
            "auth-storage",
            JSON.stringify({
              ...get(), // Mantém o estado atual (user, refreshToken)
              accessToken: newAccessToken, // Atualiza apenas o accessToken
            }),
            {
              expires: 1, // Expira em 1 dia
              secure: true,
              sameSite: "none",
            }
          );
          
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

    const { refreshAccessToken } = useAuthStore.getState();

    // Verifica se o erro é de autenticação (401)
    if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
      try {
        // Tenta renovar o token de acesso
        await refreshAccessToken();

        // Captura o token atualizado do estado após a renovação
        const updatedAccessToken = useAuthStore.getState().accessToken;

        // Marca a requisição como um retry e define o novo cabeçalho de autorização
        error.config.__isRetryRequest = true;
        error.config.headers['Authorization'] = `Bearer ${updatedAccessToken}`;

        // Refaz a requisição original com o token atualizado
        return axios(error.config);
      } catch (refreshError) {
        // Retorna o erro caso a renovação falhe
        return Promise.reject(refreshError);
      }
    }

    // Retorna o erro se não for um erro de autenticação ou se a renovação falhar
    return Promise.reject(error);
  }
);
