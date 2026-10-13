import type { ReactElement } from 'react';
import { FlatList, View } from 'react-native';
import type { TransferListData } from '@/modules/transfer/interfaces';
import { Loading, ThemedButton, ThemedText } from '@/components/atoms';
import { TransferListItem } from '@/components/molecules';

interface TransferHistoryListProps {
	data: TransferListData[] | undefined;
	loading: boolean;
	filters: ReactElement;
	hasFilters: boolean;
	hasTransfers: boolean;
	onClearFilters: () => void;
}

export const TransferHistoryList = ({
	data,
	loading,
	filters,
	hasFilters,
	hasTransfers,
	onClearFilters
}: TransferHistoryListProps) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <TransferListItem transfer={item} />}
			keyExtractor={(item, index) =>
				`${item.payeer.document}-${item.date}-${index}`
			}
			ItemSeparatorComponent={() => <View className="h-[0.4px] bg-muted" />}
			ListHeaderComponent={!loading && hasTransfers ? filters : undefined}
			contentContainerStyle={{
				flexGrow: 1,
				margin: 12
			}}
			ListEmptyComponent={
				<View className="flex-1 items-center justify-center">
					{loading ? (
						<Loading className="text-secondary" size="large" />
					) : (
						<View className="flex gap-2">
							{hasFilters && (
								<ThemedButton
									title="Limpiar filtros"
									size="sm"
									variant="outline"
									onPress={onClearFilters}
									className="w-60 text-secondary!"
								/>
							)}
							<ThemedText className="text-center text-muted-foreground">
								No se encontraron transferencias
							</ThemedText>
						</View>
					)}
				</View>
			}
		/>
	);
};
