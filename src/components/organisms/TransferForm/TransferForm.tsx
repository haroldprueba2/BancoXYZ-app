import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postTransfer } from '@/modules/transfer/services';
import {
	createTransferFormSchema,
	TransferFormData
} from '@/modules/transfer/validation/transferFormSchema';
import { ThemedButton } from '@/components/atoms';
import { FeedbackMessage, FormInput } from '@/components/molecules';
import { formatDate } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';
import { PaperPlaneTiltIcon } from 'phosphor-react-native';

interface TransferFormProps {
	balance: number;
	currency: string;
}

export const TransferForm = ({ balance, currency }: TransferFormProps) => {
	const [message, setMessage] = useState<{
		text: string;
		type: 'success' | 'error';
	} | null>(null);

	const { control, handleSubmit, reset } = useForm<TransferFormData>({
		resolver: zodResolver(createTransferFormSchema(balance)),
		mode: 'onChange',
		defaultValues: {
			amount: '',
			payeerDocument: ''
		}
	});

	const { mutateAsync: transferMutation, isPending: isPendingTransfer } =
		useMutation({
			mutationFn: postTransfer,
			onSuccess: () => {
				setMessage({
					text: 'Transferencia realizada exitosamente.',
					type: 'success'
				});
				reset();
			},
			onError: (error) => {
				const errorObj = error as unknown as ApiError;

				if (errorObj.status === 400) {
					setMessage({
						text: 'Datos de la transferencia inválidos. Inténtalo nuevamente.',
						type: 'error'
					});
				}
			}
		});

	const onTransfer = async (data: TransferFormData) => {
		setMessage(null);
		await transferMutation({
			value: Number(data.amount),
			payeerDocument: data.payeerDocument,
			currency,
			transferDate: formatDate(new Date())
		});
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
			<FormInput
				autoFocus
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
			<ThemedButton
				title="Enviar transferencia"
				variant="secondary"
				onPress={handleSubmit(onTransfer)}
				iconLeft={<PaperPlaneTiltIcon />}
				loading={isPendingTransfer}
				className="my-6"
			/>
			{message && <FeedbackMessage text={message.text} type={message.type} />}
		</View>
	);
};
