import { View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BankTitle, ThemedButton, ThemedText } from '@/components/atoms';
import { ArrowRightIcon } from 'phosphor-react-native';
import { getInitialLetter } from '@/utils';
import { nameBank } from '@/constants';

export const WelcomeView = () => {
	const insets = useSafeAreaInsets();
	return (
		<View
			className="flex-1 px-6"
			style={{
				paddingTop: insets.top + 10,
				paddingBottom: insets.bottom + 10
			}}
		>
			<View className="flex-row items-center gap-3">
				<View className="h-16 w-16 items-center justify-center rounded-xl border-2 border-primary">
					<ThemedText className="text-2xl font-bold">
						{getInitialLetter(nameBank)}
					</ThemedText>
				</View>
				<View>
					<BankTitle />
					<ThemedText className="text-xs text-muted-foreground">
						BANCA DIGITAL
					</ThemedText>
				</View>
			</View>
			<View className="flex-1 justify-center">
				<ThemedText className="mb-4 text-xl font-semibold text-secondary">
					BIENVENIDO
				</ThemedText>
				<ThemedText className="text-4xl font-bold leading-tight">
					Tu banco,{' '}
					<ThemedText size="inherit" className="text-primary">
						siempre cerca.
					</ThemedText>
				</ThemedText>
				<ThemedText className="text-base leading-6 text-muted-foreground">
					Accede a tus servicios bancarios de forma fácil y segura.
				</ThemedText>
			</View>
			<ThemedButton
				title="Continuar"
				size="xl"
				variant="secondary"
				iconRight={<ArrowRightIcon />}
				onPress={() => router.push('/auth/login')}
			/>
		</View>
	);
};
