import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTransferScheduledStore } from '@/modules/transfer/store/useTransferScheduledStore';
import { ThemedText } from '@/components/atoms';
import { TransferScheduledForm } from '@/components/organisms';
import { useThemeColors } from '@/hooks';
import { CaretRightIcon } from 'phosphor-react-native';

export const TransferScheduledView = () => {
	const router = useRouter();
	const colors = useThemeColors();
	const { addScheduledTransfer } = useTransferScheduledStore();

	return (
		<View className="flex-1 p-4">
			<ThemedText className="mb-6 text-base leading-6 text-muted-foreground">
				Programa transferencias ingresando el monto, el documento del
				destinatario y la fecha de ejecución.
			</ThemedText>
			<TransferScheduledForm addScheduledTransfer={addScheduledTransfer} />
			<Pressable
				className="flex-row items-center justify-end gap-1 active:opacity-60"
				onPress={() => router.push('/transfer-scheduled/history')}
				accessibilityRole="link"
			>
				<ThemedText className="text-sm text-foreground underline">
					Ver transferencias programadas
				</ThemedText>
				<CaretRightIcon size={16} color={colors.foreground} />
			</Pressable>
		</View>
	);
};
