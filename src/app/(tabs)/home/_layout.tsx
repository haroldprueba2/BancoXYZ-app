import { Stack } from 'expo-router';
import { useThemeColors } from '@/hooks';

export default function HomeLayout() {
	const colors = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				animation: 'slide_from_right',
				contentStyle: {
					backgroundColor: colors.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Inicio' }}
			/>
		</Stack>
	);
}
