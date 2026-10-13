import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TransferScheduled } from '../interfaces';
import { AsyncStorageAdapter } from '@/infrastructure/adapters';

interface TransferScheduledState {
	scheduledTransfers: TransferScheduled[];
	addScheduledTransfer: (transfer: TransferScheduled) => void;
	removeScheduledTransfer: (id: string) => void;
}

export const useTransferScheduledStore = create<TransferScheduledState>()(
	persist(
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
				}))
		}),
		{
			name: 'scheduled-transfers-storage',
			storage: createJSONStorage(() => AsyncStorageAdapter)
		}
	)
);
