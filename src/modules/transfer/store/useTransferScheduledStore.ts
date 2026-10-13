import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TransferScheduled } from '../interfaces';

interface TransferScheduledState {
	scheduledTransfers: TransferScheduled[];
	addScheduledTransfer: (transfer: TransferScheduled) => void;
	removeScheduledTransfer: (id: string) => void;
	clearExecutedTransfer: (id: string) => void;
}

export const useTransferScheduledStore = create<TransferScheduledState>()(
	(set) => ({
		scheduledTransfers: [],
		addScheduledTransfer: (transfer) =>
			set((state) => ({
				scheduledTransfers: [transfer, ...state.scheduledTransfers]
			})),
		removeScheduledTransfer: (id) =>
			set((state) => ({
				scheduledTransfers: state.scheduledTransfers.filter(
					(transfer) => transfer.id !== id
				)
			})),
		clearExecutedTransfer: (id) =>
			set((state) => ({
				scheduledTransfers: state.scheduledTransfers.filter(
					(transfer) => transfer.id !== id
				)
			}))
	})
);
