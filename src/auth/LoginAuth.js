import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    // isAuthenticated: false,
    // login: (arg) => set({ isAuthenticated: arg }),
    isAuthenticated: !!localStorage.getItem('token'),
    login: (arg) => {
        set({ isAuthenticated: arg });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
    },
}));

