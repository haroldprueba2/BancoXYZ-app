import { ReactNode, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardContextProvider, ReactQueryContextProvider } from '.';
import { AppThemeRoot } from '@/theme';
import { SplashView } from '@/components/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface AppContextProps {
	children: ReactNode;
}

SplashScreen.preventAutoHideAsync();

export function AppContextProvider({ children }: AppContextProps) {
	const [isAppReady, setIsAppReady] = useState(false);

	const handleFinish = async () => {
		await SplashScreen.hideAsync();
		setIsAppReady(true);
	};

	return (
		<KeyboardContextProvider>
			<ReactQueryContextProvider>
				<AppThemeRoot>
					{!isAppReady ? (
						<SplashView onFinish={handleFinish} />
					) : (
						<SafeAreaProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								{children}
							</GestureHandlerRootView>
						</SafeAreaProvider>
					)}
				</AppThemeRoot>
			</ReactQueryContextProvider>
		</KeyboardContextProvider>
	);
}
