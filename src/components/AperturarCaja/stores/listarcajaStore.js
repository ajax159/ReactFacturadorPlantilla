import { create } from 'zustand';

export const useListarCajaStore = create((set) => ({
    datos: [],
    setDatos: (datos) => set({ datos }),
}))