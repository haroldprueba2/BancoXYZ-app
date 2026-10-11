import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { loginFormSchema } from '@/modules/auth/validation/loginFormSchema';
// import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { BankTitle, ThemedButton, ThemedText } from '@/components/atoms';
import { FormInput } from '@/components/molecules';
import { SignInIcon } from 'phosphor-react-native';

// import { ApiError } from '@/infrastructure/interfaces';
// import { setFormError } from '@/utils';

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginView = () => {
	// const { login } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onLogin = async (
		// data: LoginFormData
	) => {
		// setLoading(true);
		// try {
		// 	await login(data.email, data.password);
		// } catch (error) {
		// 	const errorObj = error as ApiError;
		// 	if (errorObj.statusCode === 401) {
		// 		setError('root', {
		// 			type: 'custom',
		// 			message: 'Invalid credentials'
		// 		});
		// 		return;
		// 	}
		// 	setFormError(setError, error);
		// } finally {
		// 	setLoading(false);
		// }
	};

	// useEffect(() => {
	// 	const subscription = watch(() => {
	// 		if (errors.root) {
	// 			clearErrors('root');
	// 		}
	// 	});

	// 	return () => subscription.unsubscribe();
	// }, [watch, errors.root, clearErrors]);

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
				placeholder="Enter your email"
				disabled={loading}
			/>
			<FormInput
				required
				control={control}
				autoCapitalize="none"
				name="password"
				label="Password"
				placeholder="Enter your password"
				isPassword={true}
				disabled={loading}
			/>
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
