import { axiosBalanceClient } from '@/api/axiosClient';
import { BalanceResponse } from '../interfaces/balance';

export const getBalance = async () => {
	try {
		const { data } = await axiosBalanceClient.get<BalanceResponse>('/balance');

		return data;
	} catch (error) {
		throw error;
	}
};
