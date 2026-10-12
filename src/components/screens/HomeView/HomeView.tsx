import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { getBalance } from '@/modules/balance/services';
import { ThemedButton, ThemedText } from '@/components/atoms';
import { Balance } from '@/components/molecules';
import { useThemeColors } from '@/hooks';
import { UserCircleIcon } from 'phosphor-react-native';

export const HomeView = () => {
	const colors = useThemeColors();
	const { user, logout } = useAuthStore();
	const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
		queryKey: ['balance'],
		queryFn: getBalance
	});

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 gap-6 px-5 py-4">
				<View className="flex-row items-center gap-3">
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
				<View className="mt-auto pb-2">
					<ThemedButton
						title="Cerrar sesión"
						variant="error"
						className="w-full"
						onPress={logout}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};
