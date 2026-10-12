import { ThemedText } from '../ThemedText';
import { ThemedTextInputVariant } from '../ThemedTextInput';
import { cn } from '@/utils';

type FormLabelProps = {
	label: string;
	required: boolean;
	hasError: boolean;
	variant: ThemedTextInputVariant;
	disabled?: boolean;
};

export const FormLabel = ({
	label,
	required,
	hasError,
	variant,
	disabled = false
}: FormLabelProps) => {
	const labelClassName = cn(
		variant === 'line'
			? 'text-sm'
			: 'absolute z-10 top-2 left-4 text-xs font-medium',
		{
			'text-destructive': hasError,
			'text-muted-foreground': !hasError && disabled,
			'text-foreground': !hasError && !disabled
		}
	);

	const requiredClassName = hasError ? 'text-destructive' : 'text-secondary';

	return (
		<ThemedText className={labelClassName}>
			{label}
			{required && (
				<ThemedText className={requiredClassName}>{' *'}</ThemedText>
			)}
		</ThemedText>
	);
};
