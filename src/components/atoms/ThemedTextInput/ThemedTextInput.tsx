import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { useThemeColors } from '@/hooks';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const themedTextInputVariants = cva('w-full text-base text-foreground', {
	variants: {
		variant: {
			outlined: 'min-h-14 px-4 pt-6 pb-2 border-2 rounded-xl',
			line: 'border-b pb-2'
		},
		state: {
			default: 'border-input bg-input',
			focused: 'border-ring bg-input',
			error: 'border-destructive bg-destructive-muted',
			errorFocused:
				'border-destructive-focused bg-destructive-focused-background'
		},
		disabled: {
			true: 'opacity-60',
			false: ''
		}
	},
	defaultVariants: {
		variant: 'outlined',
		state: 'default',
		disabled: false
	}
});

export type ThemedTextInputVariant = NonNullable<
	VariantProps<typeof themedTextInputVariants>['variant']
>;
export type ThemedTextInputState = NonNullable<
	VariantProps<typeof themedTextInputVariants>['state']
>;

type ThemedTextInputProps = TextInputProps &
	VariantProps<typeof themedTextInputVariants> & {
		className?: string;
	};

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
	function ThemedTextInput(
		{ className, placeholderTextColor, variant, state, disabled, ...props },
		ref
	) {
		const colors = useThemeColors();

		return (
			<TextInput
				{...props}
				ref={ref}
				className={cn(
					themedTextInputVariants({ variant, state, disabled }),
					variant === 'line' && 'bg-transparent',
					className
				)}
				placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
			/>
		);
	}
);
