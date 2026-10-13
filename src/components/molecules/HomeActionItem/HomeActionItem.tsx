import { Pressable, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import type { Icon } from 'phosphor-react-native';
import { ThemedText } from '@/components/atoms';
import { useThemeColors } from '@/hooks';

interface HomeActionCardProps {
	title: string;
	description: string;
	path: Href;
	Icon: Icon;
}

export const HomeActionItem = ({
	title,
	description,
	path,
	Icon
}: HomeActionCardProps) => {
	const colors = useThemeColors();
	const router = useRouter();

	return (
		<Pressable
			onPress={() => router.push(path)}
			className="flex-grow gap-3 rounded-2xl border border-border bg-card p-4 active:opacity-70"
		>
			<Icon size={28} color={colors.primary} />
			<View className="gap-1">
				<ThemedText className="font-semibold">{title}</ThemedText>
				<ThemedText className="text-sm text-muted-foreground">
					{description}
				</ThemedText>
			</View>
		</Pressable>
	);
};
