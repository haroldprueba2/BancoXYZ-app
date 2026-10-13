import { useState } from 'react';
import { Pressable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarIcon } from 'phosphor-react-native';
import { FormLabel, ThemedText, ThemedTextInput } from '@/components/atoms';
import type { ThemedTextInputState } from '@/components/atoms/ThemedTextInput';
import { useThemeColors } from '@/hooks';
import { formatDate } from '@/utils';
import { addDays, parseISO, startOfDay } from 'date-fns';

interface DateTimePickerFieldProps {
	value: string;
	onChange: (date: string) => void;
	label?: string;
	placeholder?: string;
	error?: string;
	disabled?: boolean;
}

export const DateTimePickerField = ({
	value,
	onChange,
	label = 'Fecha',
	placeholder = 'Selecciona una fecha',
	error,
	disabled = false
}: DateTimePickerFieldProps) => {
	const colors = useThemeColors();
	const minimumDate = startOfDay(addDays(new Date(), 1));
	const [visible, setVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const hasError = Boolean(error);
	const visualState: ThemedTextInputState = hasError
		? isFocused
			? 'errorFocused'
			: 'error'
		: isFocused
			? 'focused'
			: 'default';

	return (
		<View className="mb-4 w-full">
			<View className="relative">
				{label && (
					<FormLabel
						label={label}
						required
						hasError={hasError}
						variant="outlined"
						disabled={disabled}
					/>
				)}

				<Pressable
					disabled={disabled}
					onPress={() => {
						setIsFocused(true);
						setVisible(true);
					}}
				>
					<View pointerEvents="none">
						<ThemedTextInput
							value={value}
							placeholder={placeholder}
							editable={false}
							variant="outlined"
							state={visualState}
							disabled={disabled}
						/>
					</View>

					<View className="absolute right-4 top-0 h-full justify-center">
						<CalendarIcon
							size={20}
							color={hasError ? colors.destructive : colors.primary}
						/>
					</View>
				</Pressable>
			</View>

			{error && (
				<ThemedText variant="error" className="mt-1 ml-1 text-sm">
					{error}
				</ThemedText>
			)}

			{visible && (
				<DateTimePicker
					value={value ? parseISO(value) : minimumDate}
					mode="date"
					display="calendar"
					minimumDate={minimumDate}
					onValueChange={(_event, selectedDate) => {
						if (selectedDate) {
							onChange(formatDate(selectedDate));
						}
						setVisible(false);
						setIsFocused(false);
					}}
					onDismiss={() => {
						setVisible(false);
						setIsFocused(false);
					}}
				/>
			)}
		</View>
	);
};
