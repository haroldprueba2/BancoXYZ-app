import { axiosBalanceClient } from '@/api/axiosClient';
import { Balance } from '../interfaces/balance';

export const getBalance = async () => {
	try {
		const { data } = await axiosBalanceClient.get<Balance>('/balance');

		return data;
	} catch (error) {
		throw error;
	}
};
