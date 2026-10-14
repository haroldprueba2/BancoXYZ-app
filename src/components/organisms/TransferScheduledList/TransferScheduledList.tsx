import { FlatList, View } from 'react-native';
import { Separator, ThemedText } from '@/components/atoms';
import { TransferScheduledListItem } from '@/components/molecules/TransferScheduledListItem/TransferScheduledListItem';
import type { TransferScheduled } from '@/modules/transfer/interfaces';

interface TransferScheduledListProps {
	data: TransferScheduled[];
	onRemove: (id: string) => void;
}

export const TransferScheduledList = ({
	data,
	onRemove
}: TransferScheduledListProps) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<TransferScheduledListItem
					item={item}
					onRemove={() => onRemove(item.id)}
				/>
			)}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={Separator}
			contentContainerStyle={{ flexGrow: 1, padding: 12 }}
			ListEmptyComponent={
				<View className="flex-1 items-center justify-center py-6">
					<ThemedText className="text-center text-sm text-muted-foreground">
						No hay transferencias programadas.
					</ThemedText>
				</View>
			}
		/>
	);
};
