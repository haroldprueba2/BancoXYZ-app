import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedButton } from '@/components/atoms';
import {
	FeedbackMessage,
	FormAmountInput,
	FormInput
} from '@/components/molecules';
import { delay, formatDate } from '@/utils';
import { CalendarPlusIcon } from 'phosphor-react-native';
import {
	TransferScheduledFormData,
	transferScheduledFormSchema
} from '@/modules/transfer/validation';
import { TransferScheduled } from '@/modules/transfer/interfaces';

interface TransferScheduledFormProps {
	addScheduledTransfer: (transfer: TransferScheduled) => void;
}

export const TransferScheduledForm = ({
	addScheduledTransfer
}: TransferScheduledFormProps) => {
	const [message, setMessage] = useState<{
		text: string;
		type: 'success' | 'error';
	} | null>(null);

	const { control, handleSubmit, reset } = useForm<TransferScheduledFormData>({
		resolver: zodResolver(transferScheduledFormSchema),
		mode: 'onChange',
		defaultValues: {
			amount: '',
			payeerDocument: '',
			scheduledDate: ''
		}
	});

	const { mutateAsync: transferMutation, isPending: isPendingTransfer } =
		useMutation({
			mutationFn: async (data: TransferScheduledFormData) => {
				await delay(3000);

				addScheduledTransfer({
					id: '123456789',
					amount: data.amount,
					payeerDocument: data.payeerDocument,
					scheduledDate: data.scheduledDate,
					createdAt: new Date()
				});

				console.log({ data });
				// return {
				// 	...data,
				// 	status: 'scheduled',
				// 	transferDate: formatDate(new Date())
				// };
			},
			onSuccess: () => {
				setMessage({
					text: 'Transferencia programada exitosamente.',
					type: 'success'
				});
				reset();
			},
			onError: () => {
				setMessage({
					text: 'No se pudo programar la transferencia. Inténtalo nuevamente.',
					type: 'error'
				});
			}
		});

	const onTransfer = async (data: TransferScheduledFormData) => {
		setMessage(null);
		await transferMutation(data);
	};

	useFocusEffect(
		useCallback(() => {
			return () => {
				reset();
				setMessage(null);
			};
		}, [reset])
	);

	return (
		<View>
			<FormAmountInput
				required
				keyboardType="number-pad"
				control={control}
				name="amount"
				label="Monto (USD)"
				placeholder="Ej. 100"
				disabled={isPendingTransfer}
			/>
			<FormInput
				required
				keyboardType="number-pad"
				control={control}
				name="payeerDocument"
				label="Documento del destinatario"
				placeholder="Ingresa el número de documento"
				disabled={isPendingTransfer}
			/>
			<FormInput
				required
				control={control}
				name="scheduledDate"
				label="Fecha de la transferencia"
				placeholder="YYYY-MM-DD"
				disabled={isPendingTransfer}
			/>
			<ThemedButton
				title="Programar Transferencia"
				variant="secondary"
				onPress={handleSubmit(onTransfer)}
				iconLeft={<CalendarPlusIcon />}
				loading={isPendingTransfer}
				className="my-6"
			/>

			{message && <FeedbackMessage text={message.text} type={message.type} />}
		</View>
	);
};
