import { create } from 'zustand';
import { authService, api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response: any = await authService.login({ email, password });

      if (response.success && response.data) {
        const { user, token } = response.data;
        api.setToken(token);

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: any) => {
    try {
      set({ isLoading: true });
      const response: any = await authService.register(data);

      if (response.success && response.data) {
        const { user, token } = response.data;
        api.setToken(token);

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    api.clearToken();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response: any = await authService.getMe();

      if (response.success && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
