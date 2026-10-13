import { View } from 'react-native';
import { TransferScheduledForm } from '@/components/organisms';
import { useTransferScheduledStore } from '@/modules/transfer/store/useTransferScheduledStore';

export const TransferScheduledView = () => {
	const { scheduledTransfers, addScheduledTransfer } =
		useTransferScheduledStore();

	console.log({ scheduledTransfers });

	return (
		<View className="flex-1 p-6">
			<TransferScheduledForm addScheduledTransfer={addScheduledTransfer} />
		</View>
	);
};
