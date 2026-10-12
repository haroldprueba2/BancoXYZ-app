import { Tabs } from 'expo-router';

import { HouseIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

export default function TabsLayout() {
	const colors = useThemeColors();
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				tabBarActiveTintColor: colors.secondary,
				tabBarInactiveTintColor: 'white',
				tabBarActiveBackgroundColor: colors.background,
				animation: 'none',
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopWidth: 0,
					elevation: 0
				},
				popToTopOnBlur: true,
				tabBarHideOnKeyboard: true
			}}
			backBehavior="order"
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Inicio',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<HouseIcon size={24} color={focused ? colors.secondary : 'white'} />
					)
				}}
			/>
		</Tabs>
	);
}
