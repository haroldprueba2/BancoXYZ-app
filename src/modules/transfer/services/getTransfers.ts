import { axiosTransferHistoryClient } from '@/api/axiosClient';
import { TransferListResponse } from '../interfaces';

export const getTransfers = async () => {
	try {
		const { data } =
			await axiosTransferHistoryClient.get<TransferListResponse>(
				'/transferList'
			);

		return data;
	} catch (error) {
		throw error;
	}
};
