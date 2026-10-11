import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { HouseIcon } from 'phosphor-react-native';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: 'white',
				tabBarActiveBackgroundColor: colors.secondary,
				animation: 'none',
				tabBarStyle: {
					backgroundColor: colors.secondary
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
						<HouseIcon size={24} color={focused ? colors.primary : 'white'} />
					)
				}}
			/>
		</Tabs>
	);
}
