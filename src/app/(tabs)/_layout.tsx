import { Tabs } from 'expo-router';
import { HouseIcon, SwapIcon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

export default function TabsLayout() {
	const colors = useThemeColors();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				sceneStyle: { backgroundColor: colors.background },
				tabBarActiveTintColor: colors.secondary,
				tabBarInactiveTintColor: colors.foreground,
				tabBarActiveBackgroundColor: colors.background,
				animation: 'shift',
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopWidth: 0,
					elevation: 0
				},
				title: '',
				popToTopOnBlur: true,
				tabBarHideOnKeyboard: true
			}}
			backBehavior="order"
		>
			<Tabs.Screen
				name="home"
				options={{
					tabBarIcon: ({ color }) => (
						<HouseIcon size={24} color={String(color)} />
					)
				}}
			/>
			<Tabs.Screen
				name="transfer"
				options={{
					tabBarIcon: ({ color }) => (
						<SwapIcon size={24} color={String(color)} />
					)
				}}
			/>
		</Tabs>
	);
}
