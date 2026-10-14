import { Stack, useRouter } from 'expo-router';
import { useThemeColors } from '@/hooks';
import { BackButton } from '@/components/atoms';

export default function TransferHistoryLayout() {
	const router = useRouter();
	const colors = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.background },
				headerTintColor: colors.primary,
				headerTitleAlign: 'center',
				headerShadowVisible: false,
				animation: 'slide_from_right',
				headerLeft: () => <BackButton onPress={() => router.back()} />,
				contentStyle: {
					backgroundColor: colors.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ title: 'Historial De Transferencias' }}
			/>
		</Stack>
	);
}
