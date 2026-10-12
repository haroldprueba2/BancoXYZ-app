import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
	children: ReactNode;
}

export const reactQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: 1,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			refetchOnMount: false
		},
		mutations: {
			retry: 0
		}
	}
});

export function ReactQueryContextProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={reactQueryClient}>
			{children}
		</QueryClientProvider>
	);
}
