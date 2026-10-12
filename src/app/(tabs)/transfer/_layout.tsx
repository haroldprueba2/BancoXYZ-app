import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

export default function TransferLayout() {
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
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.back()}>
						<ArrowLeftIcon size={24} color={colors.secondary} />
					</TouchableOpacity>
				),
				contentStyle: {
					backgroundColor: colors.background
				}
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Enviar Dinero' }} />
		</Stack>
	);
}
