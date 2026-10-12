import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, 'El email es requerido')
		.email({ message: 'El email no es válido' }),
	password: z
		.string()
		.min(1, 'La contraseña es requerida')
		.min(4, 'La contraseña debe tener al menos 4 caracteres')
		.max(20, 'La contraseña puede tener máximo 20 caracteres')
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
