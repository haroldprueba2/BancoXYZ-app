import { axiosTransferClient } from '@/api/axiosClient';
import { TransferRequest, TransferResponse } from '../interfaces';

export const postTransfer = async (body: TransferRequest) => {
	try {
		const { data } = await axiosTransferClient.post<TransferResponse>(
			'/transfer',
			body
		);

		return data;
	} catch (error) {
		throw error;
	}
};
