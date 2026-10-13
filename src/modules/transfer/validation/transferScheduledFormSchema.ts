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
	scheduledDate: z.iso.date('La fecha es requerida')
});

export type TransferScheduledFormData = z.infer<
	typeof transferScheduledFormSchema
>;
