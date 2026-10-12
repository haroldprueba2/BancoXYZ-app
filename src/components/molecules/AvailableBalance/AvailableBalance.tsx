import { View } from 'react-native';
import { ThemedText } from '@/components/atoms';
import { formatCurrency } from '@/utils';

interface AvailableBalanceProps {
	balance: number;
	currency: string;
}

export const AvailableBalance = ({
	balance,
	currency
}: AvailableBalanceProps) => {
	return (
		<View className="mb-4 flex-row items-center justify-between">
			<ThemedText className="text-sm text-muted-foreground">
				Saldo disponible
			</ThemedText>
			<ThemedText className="text-sm font-semibold text-foreground">
				{formatCurrency(balance, currency)}
			</ThemedText>
		</View>
	);
};
