import { View } from 'react-native';
import type { Href } from 'expo-router';
import {
	ArrowsLeftRightIcon,
	ListBulletsIcon,
	CalendarCheckIcon,
	type Icon
} from 'phosphor-react-native';
import { ThemedText } from '@/components/atoms';
import { HomeActionItem } from '@/components/molecules';

interface HomeActionData {
	title: string;
	description: string;
	path: Href;
	Icon: Icon;
}

const actions: HomeActionData[] = [
	{
		title: 'Transferencias',
		description: 'Envía dinero',
		path: '/transfer',
		Icon: ArrowsLeftRightIcon
	},
	{
		title: 'Movimientos',
		description: 'Consulta tu historial',
		path: '/transfer-history',
		Icon: ListBulletsIcon
	},
	{
		title: 'Transferencias futuras',
		description: 'Consulta tus transferencias programadas',
		path: '/transfer-scheduled',
		Icon: CalendarCheckIcon
	}
];

export const HomeAction = () => {
	return (
		<View className="gap-4">
			<ThemedText className="text-lg font-bold">Acciones</ThemedText>
			<View className="flex-row flex-wrap gap-3">
				{actions.map(({ title, description, path, Icon }) => (
					<HomeActionItem
						key={path.toString()}
						title={title}
						description={description}
						path={path}
						Icon={Icon}
					/>
				))}
			</View>
		</View>
	);
};
