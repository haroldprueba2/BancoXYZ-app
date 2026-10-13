import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { getBalance } from '@/modules/balance/services';
import { ThemedText } from '@/components/atoms';
import { Balance } from '@/components/molecules';
import { HomeAction } from '@/components/organisms';
import { useThemeColors } from '@/hooks';
import { UserCircleIcon } from 'phosphor-react-native';

export const HomeView = () => {
	const colors = useThemeColors();
	const { user } = useAuthStore();
	const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
		queryKey: ['balance'],
		queryFn: getBalance
	});

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 gap-6 p-6">
				<View className="flex-row items-center gap-2">
					<View className="h-14 w-14 items-center justify-center rounded-full">
						<UserCircleIcon size={36} color={colors.primary} weight="duotone" />
					</View>
					<View className="flex-1 gap-1">
						<ThemedText className="text-sm text-muted-foreground">
							Bienvenido
						</ThemedText>
						<ThemedText className="text-xl font-bold" numberOfLines={1}>
							{user?.name ?? 'Usuario'}
						</ThemedText>
					</View>
				</View>
				<Balance
					balance={dataBalance?.accountBalance ?? 0}
					currency={dataBalance?.currency ?? 'USD'}
					loading={isLoadingBalance}
				/>
				<HomeAction />
			</View>
		</SafeAreaView>
	);
};
