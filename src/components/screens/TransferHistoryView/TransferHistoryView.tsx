import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getTransfers } from '@/modules/transfer/services';
import { TransferFilters, TransferHistoryList } from '@/components/organisms';

export const TransferHistoryView = () => {
	const { data: dataTransfers, isLoading: isLoadingTransfers } = useQuery({
		queryKey: ['transfers'],
		queryFn: getTransfers
	});

	const [filters, setFilters] = useState({
		name: '',
		amount: '',
		date: ''
	});

	const clearFilters = () => {
		setFilters({ name: '', amount: '', date: '' });
	};

	const hasFilters = Boolean(filters.name || filters.amount || filters.date);

	const hasTransfers = (dataTransfers?.transfers.length ?? 0) > 0;

	const filteredTransfers = useMemo(() => {
		const transfers = dataTransfers?.transfers ?? [];
		const nameFilter = filters.name.trim().toLowerCase();
		const amountFilter = filters.amount;
		const dateFilter = filters.date;

		return transfers.filter((transfer) => {
			const matchesName = transfer.payeer.name
				.toLowerCase()
				.includes(nameFilter);
			const matchesAmount = transfer.value.toString().includes(amountFilter);
			const matchesDate = transfer.date.includes(dateFilter);

			return (
				(!nameFilter || matchesName) &&
				(!amountFilter || matchesAmount) &&
				(!dateFilter || matchesDate)
			);
		});
	}, [dataTransfers?.transfers, filters]);

	useFocusEffect(
		useCallback(() => {
			return () => {
				clearFilters();
			};
		}, [])
	);

	return (
		<View className="flex-1">
			<TransferHistoryList
				data={filteredTransfers}
				loading={isLoadingTransfers}
				filters={
					<TransferFilters
						name={filters.name}
						amount={filters.amount}
						date={filters.date}
						onChange={setFilters}
						onClear={clearFilters}
					/>
				}
				hasFilters={hasFilters}
				hasTransfers={hasTransfers}
				onClearFilters={clearFilters}
			/>
		</View>
	);
};
