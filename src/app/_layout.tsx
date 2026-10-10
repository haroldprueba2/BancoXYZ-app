import '../../global.css';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppContextProvider } from '@/context/AppContext';
import { SplashView } from '@/components/screens';
import { AppThemeRoot } from '@/theme';
import { useThemeColors } from '@/hooks';
import { ArrowLeftIcon } from 'phosphor-react-native';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	const [isAppReady, setIsAppReady] = useState(false);

	return (
		<AppContextProvider>
			<AppThemeRoot>
				{!isAppReady ? (
					<SplashView onFinish={() => setIsAppReady(true)} />
				) : (
					<SafeAreaProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<TabLayout />
						</GestureHandlerRootView>
					</SafeAreaProvider>
				)}
			</AppThemeRoot>
		</AppContextProvider>
	);
}

const isAuthenticated = false;

function TabLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const colors = useThemeColors();
	const handleBack = () => {
		if (pathname === '/auth/login') {
			router.dismissTo('/');
		} else {
			router.back();
		}
	};

	return (
		<React.Fragment>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: 'blue',
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
					headerLeft: () => (
						<TouchableOpacity onPress={handleBack}>
							<ArrowLeftIcon size={24} color={colors.secondary} />
						</TouchableOpacity>
					),
					contentStyle: {
						backgroundColor: colors.background
					}
				}}
			>
				<Stack.Protected guard={!isAuthenticated}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen
						name="auth/login/index"
						options={{
							headerTitle: 'Login'
						}}
					/>
				</Stack.Protected>
			</Stack>
		</React.Fragment>
	);
}
