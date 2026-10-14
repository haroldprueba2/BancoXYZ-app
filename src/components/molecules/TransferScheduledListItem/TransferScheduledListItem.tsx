import { View } from 'react-native';
import { ThemedText, ThemedButton } from '@/components/atoms';
import { useThemeColors } from '@/hooks';
import { parseISO } from 'date-fns';
import { formatCurrency, formatDate } from '@/utils';
import { CalendarIcon, TrashIcon } from 'phosphor-react-native';
import type { TransferScheduled } from '@/modules/transfer/interfaces';

interface TransferScheduledListItemProps {
	item: TransferScheduled;
	onRemove: () => void;
}

export const TransferScheduledListItem = ({
	item,
	onRemove
}: TransferScheduledListItemProps) => {
	const colors = useThemeColors();

	return (
		<View className="flex-row items-center gap-4 py-4">
			<View className="flex-1 gap-1">
				<View className="flex-row items-center gap-1">
					<CalendarIcon size={14} color={colors.primary} />
					<ThemedText className="text-foreground font-semibold">
						{formatDate(parseISO(item.scheduledDate))}
					</ThemedText>
				</View>
				<ThemedText className="text-sm text-muted-foreground" numberOfLines={1}>
					Documento: {item.payeerDocument}
				</ThemedText>
			</View>
			<View className="items-end gap-1">
				<ThemedText className="font-semibold">
					{formatCurrency(Number(item.amount), 'USD')}
				</ThemedText>
				<ThemedText className="text-xs text-muted-foreground">USD</ThemedText>
			</View>
			<ThemedButton
				variant="icon"
				size="sm"
				icon={<TrashIcon size={20} color={colors.destructive} />}
				onPress={onRemove}
				fullWidth={false}
			/>
		</View>
	);
};
