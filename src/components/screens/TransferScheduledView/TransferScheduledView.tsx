import { View } from 'react-native';
import { useTransferScheduledStore } from '@/modules/transfer/store/useTransferScheduledStore';
import { ThemedText } from '@/components/atoms';
import { TransferScheduledForm } from '@/components/organisms';

export const TransferScheduledView = () => {
	const { addScheduledTransfer } = useTransferScheduledStore();

	return (
		<View className="flex-1 p-6">
			<ThemedText className="mb-6 text-base leading-6 text-muted-foreground">
				Programa transferencias ingresando el monto, el documento del
				destinatario y la fecha de ejecución.
			</ThemedText>
			<TransferScheduledForm addScheduledTransfer={addScheduledTransfer} />
		</View>
	);
};
