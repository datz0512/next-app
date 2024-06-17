import { create } from 'zustand';

export const useTokenStore = create(set => ({
	token: undefined as string | undefined,
	userId: undefined as number | undefined,
	setToken: (newToken: string) => set({ token: newToken }),
	setUserId: (newUserId: number) => set({ userId: newUserId }),
	removeToken: () => set({ token: undefined }),
	removeUserId: () => set({ userId: undefined }),
}));
