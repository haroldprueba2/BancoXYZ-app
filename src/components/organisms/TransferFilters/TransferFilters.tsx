import { View } from 'react-native';
import { TransferFilterInput } from '@/components/molecules/TransferFilterInput';
import { formatAmount, isValidAmount } from '@/utils';
import { CalendarBlankIcon, MoneyIcon, UserIcon } from 'phosphor-react-native';

interface TransferFiltersProps {
	name: string;
	amount: string;
	date: string;
	onChange: (filters: { name: string; amount: string; date: string }) => void;
	onClear: () => void;
}

export const TransferFilters = ({
	name,
	amount,
	date,
	onChange
}: TransferFiltersProps) => {
	const handleChange = (field: 'name' | 'amount' | 'date', value: string) => {
		onChange({ name, amount, date, [field]: value });
	};

	const handleAmountChange = (value: string) => {
		const cleanAmount = value.replaceAll(',', '');

		if (isValidAmount(cleanAmount)) {
			handleChange('amount', cleanAmount);
		}
	};

	return (
		<View className="mb-4 w-full gap-2">
			<TransferFilterInput
				Icon={UserIcon}
				value={name}
				onChangeText={(value) => handleChange('name', value)}
				placeholder="Destinatario"
				returnKeyType="search"
				accessibilityLabel="Filtrar por destinatario"
				containerClassName="w-full flex-none"
			/>
			<View className="w-full flex-row gap-2">
				<TransferFilterInput
					Icon={CalendarBlankIcon}
					value={date}
					onChangeText={(value) => handleChange('date', value)}
					placeholder="Fecha"
					maxLength={10}
					keyboardType="numbers-and-punctuation"
					accessibilityLabel="Filtrar por fecha"
				/>
				<TransferFilterInput
					Icon={MoneyIcon}
					value={formatAmount(amount)}
					onChangeText={handleAmountChange}
					placeholder="Monto"
					keyboardType="decimal-pad"
					accessibilityLabel="Filtrar por monto"
				/>
			</View>
		</View>
	);
};
