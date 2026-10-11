import { View } from 'react-native';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { ThemedButton, ThemedText } from '@/components/atoms';

export default function HomeScreen() {
	const { user, logout } = useAuthStore();

	return (
		<View className="flex-1 justify-center items-center">
			<View className="flex flex-col items-center gap-4">
				<ThemedText className="text-4xl font-bold">
					Bienvenido a la aplicación
				</ThemedText>
				<ThemedText className="text-primary text-2xl font-bold">
					{user?.name}
				</ThemedText>
				<ThemedButton
					title="Cerrar Sesion"
					variant="error"
					className="w-36"
					onPress={logout}
				/>
			</View>
		</View>
	);
}
