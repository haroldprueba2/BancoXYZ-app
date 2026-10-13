import { FlatList, View } from 'react-native';
import type { TransferListData } from '@/modules/transfer/interfaces';
import { Loading, ThemedText } from '@/components/atoms';
import { TransferListItem } from '@/components/molecules';

interface TransferHistoryListProps {
	data: TransferListData[] | undefined;
	loading: boolean;
}

export const TransferHistoryList = ({
	data,
	loading
}: TransferHistoryListProps) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <TransferListItem transfer={item} />}
			keyExtractor={(item, index) =>
				`${item.payeer.document}-${item.date}-${index}`
			}
			ItemSeparatorComponent={() => <View className="h-[0.4px] bg-muted" />}
			contentContainerStyle={{ flexGrow: 1, paddingRight: 12 }}
			ListEmptyComponent={
				<View className="flex-1 items-center justify-center">
					{loading ? (
						<Loading className="text-secondary" size="large" />
					) : (
						<ThemedText className="text-center text-muted-foreground">
							No se encontraron transferencias
						</ThemedText>
					)}
				</View>
			}
		/>
	);
};
