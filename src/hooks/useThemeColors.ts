import { colors } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export const useThemeColors = () => {
	const scheme = useColorScheme();
	const theme = scheme === 'unspecified' ? 'light' : scheme;

	return {
		...colors[theme],
		primary: colors.primary,
		secondary: colors.secondary
	};
};
