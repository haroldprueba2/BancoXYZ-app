import * as axios from 'axios';
import { StorageAdapter } from '@/infrastructure/adapters';
import { parseAxiosError } from '@/utils';

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
				const accessToken = await StorageAdapter.getItem('accessToken');

				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`;
				}

				return config;
			},
			(error) => Promise.reject(error)
		);
	}

	axiosClient.interceptors.response.use(
		(response) => response,
		(error) => Promise.reject(parseAxiosError(error))
	);

	return axiosClient;
};

export const axiosAuthClient = createAxiosClient(
	process.env.EXPO_PUBLIC_AUTH_API_URL,
	false
);
