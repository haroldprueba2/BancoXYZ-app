import { ReactNode } from 'react';
import { KeyboardContextProvider } from '.';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	return <KeyboardContextProvider>{children}</KeyboardContextProvider>;
}
