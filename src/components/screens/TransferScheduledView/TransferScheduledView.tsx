import { View } from 'react-native';

import { ThemedText } from '@/components/atoms';

export const TransferScheduledView = () => {
	return (
		<View className="flex-1 p-6">
			<ThemedText className="mb-6 text-base leading-6 text-muted-foreground">
				aca ira las transferencias programadas
			</ThemedText>
		</View>
	);
};
