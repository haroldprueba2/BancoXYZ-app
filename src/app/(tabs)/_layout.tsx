import { Tabs } from 'expo-router';
import {
	ArrowsLeftRightIcon,
	CalendarCheckIcon,
	HouseIcon,
	ListBulletsIcon,
	type Icon
} from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';

interface TabItem {
	name: string;
	Icon: Icon;
}

const tabs: TabItem[] = [
	{
		name: 'home',
		Icon: HouseIcon
	},
	{
		name: 'transfer',
		Icon: ArrowsLeftRightIcon
	},
	{
		name: 'transfer-history',
		Icon: ListBulletsIcon
	},
	{
		name: 'transfer-scheduled',
		Icon: CalendarCheckIcon
	}
];

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
			backBehavior="initialRoute"
		>
			{tabs.map(({ name, Icon }) => (
				<Tabs.Screen
					key={name}
					name={name}
					options={{
						tabBarIcon: ({ color }) => <Icon size={24} color={String(color)} />
					}}
				/>
			))}
		</Tabs>
	);
}
