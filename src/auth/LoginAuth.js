import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    login: (arg) => set({ isAuthenticated: arg }),
}));

