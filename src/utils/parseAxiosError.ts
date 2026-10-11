import { isAxiosError } from 'axios';
import type { ApiError } from '@/infrastructure/interfaces';

export const parseAxiosError = (error: unknown): ApiError => {
	if (isAxiosError(error)) {
		const status = error.response?.status ?? 0;
		const responseData = error.response?.data;

		if (responseData?.message) {
			return {
				message: responseData.message,
				status
			};
		}

		if (!error.response) {
			return {
				message: 'Network error. Check your connection',
				status: 0
			};
		}

		return {
			message: 'An unexpected error occurred',
			status
		};
	}

	return {
		message: 'Unknown error',
		status: 500
	};
};
