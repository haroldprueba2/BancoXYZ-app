import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../atoms';

export const WelcomeView = () => {
	return (
		<View className="flex-1 px-6 pb-12 pt-14">
			<View className="flex-row items-center gap-3">
				<View className="h-16 w-16 items-center justify-center rounded-xl bg-primary">
					<Text className="text-2xl font-bold text-foreground">B</Text>
				</View>
				<View>
					<Text className="text-lg font-bold text-foreground">BancoXYZ</Text>
					<Text className="text-xs text-muted-foreground">BANCA DIGITAL</Text>
				</View>
			</View>
			<View className="flex-1 justify-center">
				<Text className="mb-4 text-xl font-semibold text-secondary">
					BIENVENIDO
				</Text>
				<Text className="mb-5 text-4xl font-bold leading-tight text-foreground">
					Tu banco, <Text className="text-primary">siempre cerca.</Text>
				</Text>

				<Text className="text-base leading-6 text-muted-foreground">
					Accede a tus servicios bancarios de forma fácil y segura.
				</Text>
			</View>
			<Button
				title="Iniciar sesión"
				variant="secondary"
				className="p-4"
				textClassName="font-semibold"
				onPress={() => router.push('/auth/login')}
			/>
		</View>
	);
};
