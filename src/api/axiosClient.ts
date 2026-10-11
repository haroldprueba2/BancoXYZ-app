import { default as axios } from 'axios';
// import { StorageAdapter } from '@/adapters/storage-adapter';
import { parseAxiosError } from '@/utils';

const axiosClient = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosClient.interceptors.request.use(
	async (config) => {
		// const accessToken = await StorageAdapter.getItem('accessToken');

		// if (accessToken) {
		// 	config.headers.Authorization = `Bearer ${accessToken}`;
		// }

		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(parseAxiosError(error))
);

export default axiosClient;
