import { z } from 'zod';

const isValidAmount = (value: string) => Number.isFinite(Number(value));

const isPositiveAmount = (value: string) => Number(value) > 0;

export const transferScheduledFormSchema = z.object({
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
		.max(20, 'El documento no puede superar los 20 dígitos'),
	scheduledDate: z.string().min(1, 'Please select a date')
	// .refine(
	// 	(date) => {
	// 		const selectedDate = new Date(date);
	// 		const today = new Date();
	// 		today.setHours(0, 0, 0, 0);
	// 		return selectedDate > today;
	// 	},
	// 	{
	// 		message: 'The date must be a future date (tomorrow onwards)'
	// 	}
	// )
});

export type TransferScheduledFormData = z.infer<
	typeof transferScheduledFormSchema
>;
