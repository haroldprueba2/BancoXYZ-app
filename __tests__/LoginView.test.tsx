import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { LoginView } from '@/components/screens';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import type { AuthRequest, AuthResponse } from '@/modules/auth/interfaces/auth';

jest.mock('@/infrastructure/adapters', () => ({
	SecureStorageAdapter: {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn()
	}
}));

jest.mock('@/modules/auth/store/useAuthStore', () => ({
	useAuthStore: jest.fn()
}));

const mockLogin = jest.fn<(data: AuthRequest) => Promise<AuthResponse>>();

const mockedUseAuthStore = jest.mocked(useAuthStore);

beforeEach(() => {
	mockLogin.mockReset();

	mockedUseAuthStore.mockReturnValue({
		login: mockLogin,
		loading: false
	} as ReturnType<typeof useAuthStore>);
});

describe('LoginView', () => {
	test('1. muestra errores si los campos están vacíos', async () => {
		const { getByText, findByText } = await render(<LoginView />);

		await fireEvent.press(getByText('Iniciar Sesión'));

		expect(await findByText('El email es requerido')).toBeTruthy();
		expect(await findByText('La contraseña es requerida')).toBeTruthy();
		expect(mockLogin).not.toHaveBeenCalled();
	});

	test('2. envía las credenciales válidas al store', async () => {
		mockLogin.mockResolvedValueOnce({
			token: 'test-token',
			user: {
				id: 1,
				name: 'Gabriel',
				email: 'gabriel@topaz.com'
			}
		});

		const { getByPlaceholderText, getByText } = await render(<LoginView />);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu email'),
			'gabriel@topaz.com'
		);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu contraseña'),
			'1111'
		);

		await fireEvent.press(getByText('Iniciar Sesión'));

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith({
				email: 'gabriel@topaz.com',
				password: '1111'
			});
		});
	});

	test('3. muestra un mensaje cuando las credenciales son incorrectas', async () => {
		mockLogin.mockRejectedValueOnce({ status: 401 });

		const { getByPlaceholderText, getByText, findByText } = await render(
			<LoginView />
		);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu email'),
			'error@test.com'
		);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu contraseña'),
			'wrongpass'
		);

		await fireEvent.press(getByText('Iniciar Sesión'));

		expect(
			await findByText('Credenciales incorrectas. Inténtalo de nuevo.')
		).toBeTruthy();
	});

	test('4. muestra errores cuando el email o la contraseña no son válidos', async () => {
		const { getByPlaceholderText, getByText, findByText } = await render(
			<LoginView />
		);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu email'),
			'correo-invalido'
		);

		await fireEvent.changeText(
			getByPlaceholderText('Ingresa tu contraseña'),
			'123'
		);

		await fireEvent.press(getByText('Iniciar Sesión'));

		expect(await findByText('El email no es válido')).toBeTruthy();
		expect(
			await findByText('La contraseña debe tener al menos 4 caracteres')
		).toBeTruthy();
		expect(mockLogin).not.toHaveBeenCalled();
	});
});
