import { ActivityIndicator } from 'react-native';

interface LoadingProps {
	size?: number | 'large' | 'small';
}

export const Loading = ({ size = 'large' }: LoadingProps) => {
	return <ActivityIndicator size={size} className="text-foreground" />;
};
