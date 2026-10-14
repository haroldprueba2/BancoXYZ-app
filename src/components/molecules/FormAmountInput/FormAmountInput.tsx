import { useState } from 'react';
import { View, type TextInputProps } from 'react-native';
import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues
} from 'react-hook-form';
import { FormLabel, ThemedText, ThemedTextInput } from '@/components/atoms';
import type {
	ThemedTextInputState,
	ThemedTextInputVariant
} from '@/components/atoms/ThemedTextInput';
import { useThemeColors } from '@/hooks';
import { cn, formatAmount, isValidAmount } from '@/utils';

type FormAmountInputProps<T extends FieldValues> = TextInputProps & {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
	disabled?: boolean;
	variant?: ThemedTextInputVariant;
	className?: string;
};

export const FormAmountInput = <T extends FieldValues>({
	name,
	control,
	label,
	required = false,
	disabled = false,
	variant = 'outlined',
	className,
	...textInputProps
}: FormAmountInputProps<T>) => {
	const colors = useThemeColors();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref }, fieldState }) => {
				const error = fieldState.error;

				const visualState: ThemedTextInputState = error
					? isFocused
						? 'errorFocused'
						: 'error'
					: isFocused
						? 'focused'
						: 'default';

				return (
					<View className={cn('w-full', className)}>
						{label && (
							<FormLabel
								label={label}
								required={required}
								hasError={!!error}
								variant={variant}
								disabled={disabled}
							/>
						)}

						<ThemedTextInput
							{...textInputProps}
							ref={ref}
							value={formatAmount(value == null ? '' : String(value))}
							onChangeText={(text) => {
								const amount = text.replaceAll(',', '');
								if (isValidAmount(amount)) onChange(amount);
							}}
							onFocus={() => setIsFocused(true)}
							onBlur={() => {
								setIsFocused(false);
								onBlur();
							}}
							keyboardType="decimal-pad"
							placeholderTextColor={colors.mutedForeground}
							editable={!disabled}
							variant={variant}
							state={visualState}
							disabled={disabled}
						/>

						{error?.message && (
							<ThemedText variant="error" className="mt-1 ml-1 text-sm">
								{error.message}
							</ThemedText>
						)}
					</View>
				);
			}}
		/>
	);
};
