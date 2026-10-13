import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import type { Icon } from 'phosphor-react-native';
import { useThemeColors } from '@/hooks';
import { cn } from '@/utils';

interface TransferFilterInputProps extends TextInputProps {
	Icon?: Icon;
	containerClassName?: string;
}

export const TransferFilterInput = ({
	Icon,
	containerClassName,
	className,
	onFocus,
	onBlur,
	...props
}: TransferFilterInputProps) => {
	const colors = useThemeColors();
	const [isFocused, setIsFocused] = useState(false);
	const accentColor = isFocused ? colors.secondary : colors.mutedForeground;

	return (
		<View
			className={cn(
				'h-11 min-w-0 flex-1 flex-row items-center rounded-lg border bg-background px-2',
				isFocused ? 'border-ring' : 'border-muted',
				containerClassName
			)}
		>
			{Icon && <Icon size={16} color={accentColor} />}

			<TextInput
				{...props}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholderTextColor={colors.mutedForeground}
				className={cn(
					'ml-1 min-w-0 flex-1 p-0 text-sm text-foreground',
					className
				)}
			/>
		</View>
	);
};
