import { fireEvent, render } from '@testing-library/react-native';
import { Balance } from '@/components/molecules/Balance/Balance';

const balanceProps = { balance: 1250.5, currency: 'USD' };

const renderBalance = async (loading: boolean) => {
	const rendered = await render(
		<Balance {...balanceProps} loading={loading} />
	);
	const [toggleButton] = rendered.container.queryAll(
		(instance) => typeof instance.props.onResponderRelease === 'function'
	);

	if (!toggleButton) {
		throw new Error('No se encontró el botón para mostrar el saldo');
	}

	return { ...rendered, toggleButton };
};

const balanceElement = (loading: boolean) => (
	<Balance {...balanceProps} loading={loading} />
);

describe('Balance', () => {
	test('1. mantiene el saldo oculto hasta que se solicita mostrarlo', async () => {
		const { getByText, toggleButton } = await renderBalance(false);

		expect(getByText('Balance Disponible')).toBeTruthy();
		expect(getByText('********')).toBeTruthy();

		await fireEvent.press(toggleButton);

		expect(getByText('$1,250.50')).toBeTruthy();
		await fireEvent.press(toggleButton);
		expect(getByText('********')).toBeTruthy();
	});

	test('2. no muestra el saldo ni permite revelarlo mientras carga', async () => {
		const { queryByText, rerender, toggleButton } = await renderBalance(true);

		expect(queryByText('$1,250.50')).toBeNull();
		await fireEvent.press(toggleButton);
		expect(queryByText('$1,250.50')).toBeNull();

		await rerender(balanceElement(false));
		expect(queryByText('********')).toBeTruthy();
	});
});