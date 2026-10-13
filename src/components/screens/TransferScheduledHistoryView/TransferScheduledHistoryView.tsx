import { View } from 'react-native';
import { TransferScheduledList } from '@/components/organisms';
import { useTransferScheduledStore } from '@/modules/transfer/store/useTransferScheduledStore';

export const TransferScheduledHistoryView = () => {
	const { scheduledTransfers, removeScheduledTransfer } =
		useTransferScheduledStore();

	return (
		<View className="flex-1">
			<TransferScheduledList
				data={scheduledTransfers}
				onRemove={removeScheduledTransfer}
			/>
		</View>
	);
};
