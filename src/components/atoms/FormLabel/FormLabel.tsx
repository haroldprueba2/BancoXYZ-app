import { ThemedText } from '../ThemedText';
import { ThemedTextInputVariant } from '../ThemedTextInput';
import { cn } from '@/utils';

type FormLabelProps = {
	label: string;
	required: boolean;
	hasError: boolean;
	variant: ThemedTextInputVariant;
};

export const FormLabel = ({
	label,
	required,
	hasError,
	variant
}: FormLabelProps) => {
	return (
		<ThemedText
			className={cn(
				variant === 'line'
					? 'text-sm'
					: 'absolute top-2 left-4 text-xs font-medium',
				hasError ? 'text-destructive' : 'text-muted-foreground'
			)}
		>
			{label}
			{required && (
				<ThemedText
					className={cn(hasError ? 'text-destructive' : 'text-secondary')}
				>
					{' *'}
				</ThemedText>
			)}
		</ThemedText>
	);
};
