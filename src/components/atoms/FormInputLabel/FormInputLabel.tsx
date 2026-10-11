import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedTextInputVariant } from '../ThemedTextInput';

type FormInputLabelProps = {
	label: string;
	required: boolean;
	hasError: boolean;
	variant: ThemedTextInputVariant;
};

export const FormInputLabel = ({
	label,
	required,
	hasError,
	variant
}: FormInputLabelProps) => {
	const labelClassName = hasError
		? 'text-destructive'
		: 'text-muted-foreground';

	return (
		<View>
			{variant === 'line' && (
				<ThemedText className={`text-sm ${labelClassName}`}>
					{label}
					{required && <ThemedText variant="error"> *</ThemedText>}
				</ThemedText>
			)}

			{variant === 'outlined' && (
				<ThemedText className="absolute top-2 left-4 text-xs font-medium text-muted-foreground">
					{label}
					{required && <ThemedText variant="error"> *</ThemedText>}
				</ThemedText>
			)}
		</View>
	);
};
