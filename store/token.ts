import { create } from 'zustand';

export const useTokenStore = create(set => ({
	token: undefined,
	setToken: (newToken: string) => set({ token: newToken }),
}));
