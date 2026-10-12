import { View } from 'react-native';
import { ThemedText } from '@/components/atoms';

export interface FeedbackMessageProps {
	text: string;
	type: 'success' | 'error';
}

export const FeedbackMessage = ({ text, type }: FeedbackMessageProps) => {
	const isSuccess = type === 'success';

	return (
		<View
			className={`mb-2 rounded-xl p-3 ${
				isSuccess ? 'bg-green-500/10' : 'bg-destructive-focused-background'
			}`}
		>
			<ThemedText
				className={`text-sm ${
					isSuccess ? 'text-green-600' : 'text-destructive'
				}`}
			>
				{text}
			</ThemedText>
		</View>
	);
};
