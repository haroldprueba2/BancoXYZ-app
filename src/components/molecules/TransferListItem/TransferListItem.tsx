import { View } from 'react-native';
import { ThemedText } from '@/components/atoms';
import { formatCurrency, formatDate } from '@/utils';
import type { TransferListData } from '@/modules/transfer/interfaces';
import { ArrowDownIcon } from 'phosphor-react-native';

interface TransferListItemProps {
	transfer: TransferListData;
}

export const TransferListItem = ({ transfer }: TransferListItemProps) => {
	return (
		<View className="flex-row items-center gap-4 py-4">
			<View className="h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
				<ArrowDownIcon size={20} color="green" />
			</View>
			<View className="flex-1 gap-1">
				<ThemedText className="font-medium" numberOfLines={1}>
					{transfer.payeer.name}
				</ThemedText>
				<ThemedText className="text-xs text-muted-foreground">
					{transfer.payeer.document}
				</ThemedText>
				<ThemedText className="text-xs text-muted-foreground">
					{formatDate(new Date(transfer.date))}
				</ThemedText>
			</View>
			<View className="items-end gap-1">
				<ThemedText className="font-semibold">
					{formatCurrency(transfer.value, transfer.currency)}
				</ThemedText>

				<ThemedText className="text-xs text-muted-foreground">
					{transfer.currency}
				</ThemedText>
			</View>
		</View>
	);
};
