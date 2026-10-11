import { nameBank } from '@/constants';
import { ThemedText } from '../ThemedText';
import { cn } from '@/utils';

type BankNameProps = {
	className?: string;
};

export const BankTitle = ({ className }: BankNameProps) => {
	return (
		<ThemedText
			className={cn('text-sm font-semibold uppercase text-primary', className)}
		>
			{nameBank}
		</ThemedText>
	);
};
