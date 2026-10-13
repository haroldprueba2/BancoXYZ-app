import { View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { type BalanceResponse } from '@/modules/balance/interfaces/balance';
import { ThemedText } from '@/components/atoms';
import { TransferForm } from '@/components/organisms';
import { AvailableBalance } from '@/components/molecules';

export const TransferView = () => {
	const queryClient = useQueryClient();
	const dataBalance = queryClient.getQueryData<BalanceResponse>(['balance']);
	const balance = dataBalance?.accountBalance ?? 0;
	const currency = dataBalance?.currency ?? 'USD';

	return (
		<View className="flex-1 p-4">
			<ThemedText className="mb-6 text-base leading-6 text-muted-foreground">
				Realiza una transferencia ingresando el monto y el documento del
				destinatario.
			</ThemedText>
			<AvailableBalance balance={balance} currency={currency} />
			<TransferForm balance={balance} currency={currency} />
		</View>
	);
};
