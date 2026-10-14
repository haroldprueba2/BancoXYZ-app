import {
	afterEach,
	beforeEach,
	describe,
	expect,
	jest,
	test
} from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';
import { TransferHistoryView } from '@/components/screens/TransferHistoryView/TransferHistoryView';
import { getTransfers } from '@/modules/transfer/services';
jest.mock('expo-router', () => ({ useFocusEffect: jest.fn() }));
jest.mock('@/modules/transfer/services', () => ({
	getTransfers: jest.fn()
}));

const mockedGetTransfers = jest.mocked(getTransfers);

const transferNames = {
	ronaldo: 'Ronaldo de Assis Moreira',
	messi: 'Lionel Andres Messi',
	valverde: 'Federico Valverde'
};

const filterLabels = {
	date: 'Filtrar por fecha',
	amount: 'Filtrar por monto',
	recipient: 'Filtrar por destinatario'
};

const filterValues = {
	date: '2024-06-12',
	amount: '2000',
	recipient: 'Federico',
	noMatch: 'Nadie'
};

const transferResponse = {
	message: 'OK: Lista de transferências obtida com sucesso. ',
	transfers: [
		{
			value: 1000,
			date: '2024-08-25',
			currency: 'USD',
			payeer: { document: '12019910177', name: transferNames.ronaldo }
		},
		{
			value: 3500,
			date: '2024-06-12',
			currency: 'USD',
			payeer: { document: '11029920288', name: transferNames.messi }
		},
		{
			value: 2000,
			date: '2024-06-12',
			currency: 'USD',
			payeer: { document: '13039930399', name: transferNames.valverde }
		}
	]
};

let queryClient: QueryClient;

beforeEach(() => {
	mockedGetTransfers.mockReset();
	mockedGetTransfers.mockResolvedValue(transferResponse);
	queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: Infinity }
		}
	});
});

afterEach(() => {
	queryClient.clear();
});

const renderHistory = async () => {
	const view = await render(
		<QueryClientProvider client={queryClient}>
			<TransferHistoryView />
		</QueryClientProvider>
	);

	return {
		...view,
		changeFilter: async (label: string, value: string) => {
			await fireEvent.changeText(await view.findByLabelText(label), value);
		}
	};
};

describe('TransferHistoryView', () => {
	test('1. filtra transferencias por fecha', async () => {
		const { changeFilter, findByText, queryByText } = await renderHistory();

		await changeFilter(filterLabels.date, filterValues.date);

		expect(await findByText(transferNames.messi)).toBeTruthy();
		expect(await findByText(transferNames.valverde)).toBeTruthy();
		expect(queryByText(transferNames.ronaldo)).toBeNull();
	});

	test('2. filtra transferencias por monto', async () => {
		const { changeFilter, findByText, queryByText } = await renderHistory();

		await changeFilter(filterLabels.amount, filterValues.amount);

		expect(await findByText(transferNames.valverde)).toBeTruthy();
		expect(queryByText(transferNames.ronaldo)).toBeNull();
		expect(queryByText(transferNames.messi)).toBeNull();
	});

	test('3. filtra transferencias por destinatario', async () => {
		const { changeFilter, findByText, queryByText } = await renderHistory();

		await changeFilter(filterLabels.recipient, filterValues.recipient);

		expect(await findByText(transferNames.valverde)).toBeTruthy();
		expect(queryByText(transferNames.ronaldo)).toBeNull();
		expect(queryByText(transferNames.messi)).toBeNull();
	});

	test('4. combina los filtros de fecha, monto y destinatario', async () => {
		const { changeFilter, findByText, queryByText } = await renderHistory();

		await changeFilter(filterLabels.date, filterValues.date);
		await changeFilter(filterLabels.amount, filterValues.amount);
		await changeFilter(filterLabels.recipient, filterValues.recipient);

		expect(await findByText(transferNames.valverde)).toBeTruthy();
		expect(queryByText(transferNames.ronaldo)).toBeNull();
		expect(queryByText(transferNames.messi)).toBeNull();
	});

	test('5. limpia los filtros y vuelve a mostrar todas las transferencias', async () => {
		const { changeFilter, findByText } = await renderHistory();

		await changeFilter(filterLabels.recipient, filterValues.noMatch);
		await fireEvent.press(await findByText('Limpiar filtros'));

		for (const name of Object.values(transferNames)) {
			expect(await findByText(name)).toBeTruthy();
		}
	});
});