import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { useThemeColors } from '@/hooks';

const themedTextInputVariants = cva('w-full bg-transparent', {
	variants: {
		variant: {
			outlined: 'min-h-16 border rounded-xl px-4 pt-6 pb-2',
			line: 'border-b pb-2'
		},
		state: {
			default: 'border-input dark:bg-input',
			focused: 'border-ring dark:bg-input',
			error: 'border-destructive dark:bg-input',
			errorFocused:
				'border-destructive-focused bg-destructive-focused-background'
		},
		disabled: {
			true: 'opacity-60',
			false: 'opacity-100'
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
	(
		{
			variant = 'outlined',
			state = 'default',
			disabled = false,
			className,
			editable,
			...props
		},
		ref
	) => {
		const colors = useThemeColors();

		return (
			<TextInput
				{...props}
				ref={ref}
				editable={disabled ? false : editable}
				className={cn(
					themedTextInputVariants({ variant, state, disabled }),
					'text-foreground',
					className
				)}
				placeholderTextColor={colors.mutedForeground}
			/>
		);
	}
);

ThemedTextInput.displayName = 'ThemedTextInput';
