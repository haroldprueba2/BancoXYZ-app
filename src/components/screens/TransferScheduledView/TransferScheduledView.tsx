import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTransferScheduledStore } from '@/modules/transfer/store/useTransferScheduledStore';
import { ThemedText } from '@/components/atoms';
import { TransferScheduledForm } from '@/components/organisms';
import { useThemeColors } from '@/hooks';
import { CaretRightIcon, ListBulletsIcon } from 'phosphor-react-native';

export const TransferScheduledView = () => {
	const colors = useThemeColors();
	const router = useRouter();
	const { addScheduledTransfer } = useTransferScheduledStore();

	return (
		<View className="flex-1 p-6">
			<ThemedText className="mb-6 text-base leading-6 text-muted-foreground">
				Programa transferencias ingresando el monto, el documento del
				destinatario y la fecha de ejecución.
			</ThemedText>
			<TransferScheduledForm addScheduledTransfer={addScheduledTransfer} />
			<Pressable
				className="flex-row items-center rounded-xl border border-border bg-card p-4 active:opacity-70"
				onPress={() => router.push('/transfer-scheduled/history')}
			>
				<View className="mr-3 h-10 w-10 items-center justify-center">
					<ListBulletsIcon size={22} color={colors.primary} />
				</View>
				<View className="flex-1">
					<ThemedText className="font-semibold">
						Transferencias programadas
					</ThemedText>
					<ThemedText className="mt-1 text-sm text-muted-foreground">
						Consulta tus próximas transferencias
					</ThemedText>
				</View>
				<CaretRightIcon size={20} color={colors.mutedForeground} />
			</Pressable>
		</View>
	);
};
