import * as axios from 'axios';
import { parseAxiosError } from '@/utils';
import { SecureStorageAdapter } from '@/infrastructure/adapters';

const createAxiosClient = (baseURL: string | undefined, withAuth = true) => {
	const axiosClient = axios.create({
		baseURL,
		timeout: 150000,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	if (withAuth) {
		axiosClient.interceptors.request.use(
			async (config) => {
				const token = await SecureStorageAdapter.getItem('token');

				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			(error) => Promise.reject(error)
		);
	}

	axiosClient.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401) {
				const { useAuthStore } =
					await import('@/modules/auth/store/useAuthStore');
				useAuthStore.getState().logout();
			}

			return Promise.reject(parseAxiosError(error));
		}
	);

	return axiosClient;
};

export const axiosAuthClient = createAxiosClient(
	process.env.EXPO_PUBLIC_AUTH_API_URL,
	false
);

export const axiosBalanceClient = createAxiosClient(
	process.env.EXPO_PUBLIC_BALANCE_API_URL
);

export const axiosTransferClient = createAxiosClient(
	process.env.EXPO_PUBLIC_TRANSFER_API_URL
);

export const axiosTransferHistoryClient = createAxiosClient(
	process.env.EXPO_PUBLIC_TRANSFER_HISTORY_API_URL
);
