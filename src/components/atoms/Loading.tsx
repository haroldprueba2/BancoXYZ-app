import { ActivityIndicator, useColorScheme } from 'react-native';

interface LoadingProps {
	size?: number | 'large' | 'small';
}

export const Loading = ({ size = 'large' }: LoadingProps) => {
	const schema = useColorScheme();

	return (
		<ActivityIndicator
			size={size}
			color={schema === 'dark' ? 'white' : 'black'}
		/>
	);
};
