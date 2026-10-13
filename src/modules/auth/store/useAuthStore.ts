import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { postLogin } from '../services';
import { SecureStorageAdapter } from '@/infrastructure/adapters';
import type { AuthRequest, AuthResponse, AuthUser } from '../interfaces/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: AuthUser | null;
	loading: boolean;
	login: (data: AuthRequest) => Promise<AuthResponse>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			loading: false,
			login: async (data: AuthRequest) => {
				set({ loading: true });
				try {
					const resp = await postLogin(data);
					await SecureStorageAdapter.setItem('token', resp.token);
					set({ isAuthenticated: true, user: resp.user });
					return resp;
				} catch (error) {
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			logout: async () => {
				await SecureStorageAdapter.removeItem('token');
				set({ isAuthenticated: false, user: null });
			}
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => SecureStorageAdapter),
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user
			})
		}
	)
);
