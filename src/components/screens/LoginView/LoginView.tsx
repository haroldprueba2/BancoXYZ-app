import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	LoginFormData,
	loginFormSchema
} from '@/modules/auth/validation/loginFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { BankTitle, ThemedButton, ThemedText } from '@/components/atoms';
import { FormInput } from '@/components/molecules';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';
import { SignInIcon } from 'phosphor-react-native';

export const LoginView = () => {
	const { login, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onLogin = async (data: LoginFormData) => {
		try {
			await login(data);
		} catch (error) {
			const errorObj = error as ApiError;
			if (errorObj.status === 401) {
				setError('root', {
					type: 'custom',
					message: 'Credenciales incorrectas. Inténtalo de nuevo.'
				});
				return;
			}
			setFormError(setError, errorObj);
		}
	};

	return (
		<View className="flex-1 justify-center m-6">
			<View className="mb-10 gap-2">
				<BankTitle />

				<ThemedText className="text-3xl font-bold text-foreground">
					Accede a tu cuenta
				</ThemedText>

				<ThemedText className="text-base text-muted-foreground">
					Ingresa tus datos para continuar
				</ThemedText>
			</View>
			<FormInput
				autoFocus
				required
				autoCapitalize="none"
				keyboardType="email-address"
				control={control}
				name="email"
				label="Email"
				placeholder="Ingresa tu email"
				disabled={loading}
			/>
			<FormInput
				required
				control={control}
				autoCapitalize="none"
				name="password"
				label="Contraseña"
				placeholder="Ingresa tu contraseña"
				isPassword={true}
				disabled={loading}
			/>
			{errors.root && (
				<ThemedText className="mb-4 text-destructive">
					{errors.root.message}
				</ThemedText>
			)}
			<ThemedButton
				title="Iniciar Sesión"
				variant="secondary"
				onPress={handleSubmit(onLogin)}
				iconLeft={<SignInIcon />}
				className="mt-5"
				loading={loading}
			/>
		</View>
	);
};
