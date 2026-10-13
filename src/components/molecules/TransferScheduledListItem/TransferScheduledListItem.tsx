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
		<View className="flex-row items-center gap-3 border-b border-border py-4">
			<View className="flex-1 gap-2">
				<ThemedText className="font-semibold">
					{formatCurrency(Number(item.amount), 'USD')}
				</ThemedText>

				<ThemedText className="text-sm text-muted-foreground" numberOfLines={1}>
					Documento: {item.payeerDocument}
				</ThemedText>

				<View className="flex-row items-center gap-1.5 self-start">
					<CalendarIcon size={16} color={colors.primary} />
					<ThemedText className="text-sm font-semibold text-primary">
						{formatDate(parseISO(item.scheduledDate))}
					</ThemedText>
				</View>
			</View>
			<ThemedButton
				variant="icon"
				size="sm"
				icon={<TrashIcon size={20} color={colors.destructive} />}
				onPress={onRemove}
				fullWidth={false}
				className="self-center"
			/>
		</View>
	);
};
