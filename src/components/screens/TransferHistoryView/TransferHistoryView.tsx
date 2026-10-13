import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getTransfers } from '@/modules/transfer/services';
import { TransferHistoryList } from '@/components/organisms';

export const TransferHistoryView = () => {
	const { data: dataTransfers, isLoading: isLoadingTransfers } = useQuery({
		queryKey: ['transfers'],
		queryFn: getTransfers
	});

	return (
		<View className="flex-1 pt-0 p-6">
			<TransferHistoryList
				data={dataTransfers?.transfers}
				loading={isLoadingTransfers}
			/>
		</View>
	);
};
