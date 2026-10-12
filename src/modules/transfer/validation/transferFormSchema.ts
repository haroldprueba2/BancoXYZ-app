import { z } from 'zod';

const isValidAmount = (value: string) => Number.isFinite(Number(value));

const isPositiveAmount = (value: string) => Number(value) > 0;

const exceedsBalance = (amount: string, balance?: number) =>
	balance !== undefined && isValidAmount(amount) && Number(amount) > balance;

export const createTransferFormSchema = (balance?: number) =>
	z
		.object({
			amount: z
				.string()
				.trim()
				.min(1, 'El monto es requerido')
				.refine(isValidAmount, {
					message: 'Ingresa un monto válido'
				})
				.refine(isPositiveAmount, {
					message: 'El monto debe ser mayor que 0'
				}),

			payeerDocument: z
				.string()
				.trim()
				.min(1, 'El documento del destinatario es requerido')
				.regex(/^\d+$/, 'El documento solo debe contener números')
				.min(5, 'El documento debe tener al menos 5 dígitos')
				.max(20, 'El documento no puede superar los 20 dígitos')
		})
		.superRefine(({ amount }, ctx) => {
			if (exceedsBalance(amount, balance)) {
				ctx.addIssue({
					code: 'custom',
					path: ['amount'],
					message: 'El monto supera el saldo disponible.'
				});
			}
		});

export type TransferFormData = z.infer<
	ReturnType<typeof createTransferFormSchema>
>;
