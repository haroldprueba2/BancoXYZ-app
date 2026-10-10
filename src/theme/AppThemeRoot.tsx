import type { ReactNode } from 'react';
import { View, useColorScheme } from 'react-native';
import { themes } from '@/theme/theme';
import { StatusBar } from 'expo-status-bar';

interface AppThemeRootProps {
	children: ReactNode;
}

export function AppThemeRoot({ children }: AppThemeRootProps) {
	const scheme = useColorScheme();
	const theme = scheme === 'dark' ? 'dark' : 'light';

	return (
		<View className="flex-1" style={themes[theme]}>
			<StatusBar style={theme} />
			{children}
		</View>
	);
}
