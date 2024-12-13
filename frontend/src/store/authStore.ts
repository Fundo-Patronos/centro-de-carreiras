import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthState {
  username: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (_user: { username: string, email: string}, _accessToken: string, _refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (_accessToken: string) => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    (set, get) => {
        // Tenta carregar o estado inicial do cookie
        const authData = Cookies.get("auth-storage");
        const initialState = authData ? JSON.parse(authData) : {};

        return {
            username: initialState.username || null,
            email: initialState.email || null,
            accessToken: initialState.accessToken || null,
            refreshToken: initialState.refreshToken || null,

            // Função para fazer login e armazenar tokens
            login: (user, accessToken, refreshToken) => {
                set({
                    username: user.username,
                    email: user.email,
                    accessToken,
                    refreshToken,
                });

                // Armazena os tokens nos cookies
                Cookies.set(
                    "auth-storage",
                    JSON.stringify({
                        ...get(),
                    }),
                    {
                        expires: 1, // Expira em 1 dia
                        secure: true,
                        sameSite: "none",
                    }
                );
            },

            // Função para logout
            logout: () => {
                set({
                    username: null,
                    email: null,
                    accessToken: null,
                    refreshToken: null,
                });

                // Remove os cookies
                Cookies.remove("auth-storage");
            },

            // Atualiza o token de acesso
            setAccessToken: (accessToken) => {
                set((state) => ({
                    ...state,
                    accessToken,
                }));

                // Atualiza o token de acesso no cookie
                const currentState = get();
                Cookies.set(
                    "auth-storage",
                    JSON.stringify({
                        ...currentState,
                        accessToken,
                    }),
                    {
                        expires: 1, // Expira em 1 dia
                        secure: true,
                        sameSite: "none",
                    }
                );
            },

            // Lógica de renovação de token utilizando o refresh token
            refreshAccessToken: async () => {
                const { refreshToken } = get();
                try {
                    const response = await axios.post('/api/refresh-token', { refreshToken }, { withCredentials: true });
                    const newAccessToken = response.data.accessToken;

                    // Atualiza o estado global com o novo token de acesso
                    set({ accessToken: newAccessToken });

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
                    set({ username: null, email: null, accessToken: null, refreshToken: null });
                    Cookies.remove("auth-storage");
                }
            },
        };
    }
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
