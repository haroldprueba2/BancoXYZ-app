import { axiosAuthClient } from '@/api/axiosClient';
import { AuthRequest, AuthResponse } from '../interfaces/auth';

export const postLogin = async (dataAuth: AuthRequest) => {
	try {
		const { data } = await axiosAuthClient.post<AuthResponse>(
			'/login',
			dataAuth
		);

		return data;
	} catch (error) {
		throw error;
	}
};
