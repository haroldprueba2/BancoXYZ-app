import { useState } from 'react';
import { View } from 'react-native';
import { ThemedButton, ThemedText, ViewCard } from '@/components/atoms';
import { useThemeColors } from '@/hooks';
import { formatCurrency } from '@/utils';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';

interface BalanceProps {
	balance: number;
	currency: string;
	loading: boolean;
}

export const Balance = ({ balance, currency, loading }: BalanceProps) => {
	const colors = useThemeColors();

	const [isHidden, setIsHidden] = useState(true);

	const toggleVisibility = () => {
		setIsHidden((prev) => !prev);
	};

	const displayBalance = isHidden
		? '********'
		: formatCurrency(balance, currency);

	return (
		<ViewCard className="w-full p-6">
			<View className="flex-row gap-3">
				<View className="flex-1 justify-between gap-2">
					<ThemedText className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
						Balance Disponible
					</ThemedText>

					{loading ? (
						<View className="h-10 w-44 animate-pulse rounded-lg bg-muted" />
					) : (
						<ThemedText
							className="text-3xl font-bold"
							numberOfLines={1}
							size="inherit"
						>
							{displayBalance}
						</ThemedText>
					)}
				</View>

				<View className="justify-center">
					<ThemedButton
						variant="icon"
						disabled={loading}
						icon={
							isHidden ? (
								<EyeIcon size={30} color={colors.mutedForeground} />
							) : (
								<EyeSlashIcon size={30} color={colors.secondary} />
							)
						}
						onPress={toggleVisibility}
					/>
				</View>
			</View>
		</ViewCard>
	);
};
