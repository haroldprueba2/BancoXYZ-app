import { cloneElement, type ReactElement } from 'react';
import {
	ActivityIndicator,
	Pressable,
	View,
	type PressableProps
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconProps } from 'phosphor-react-native';

const buttonVariants = cva(
	'flex-row items-center justify-center gap-2 rounded-lg p-2',
	{
		variants: {
			variant: {
				primary: 'bg-primary',
				secondary: 'bg-secondary',
				outline: 'border border-primary bg-transparent',
				error: 'bg-destructive'
			},
			size: {
				xs: 'min-h-6',
				sm: 'min-h-9',
				md: 'min-h-10',
				lg: 'min-h-12',
				xl: 'min-h-14'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	}
);

const textVariants = cva('font-semibold', {
	variants: {
		variant: {
			primary: 'text-white',
			secondary: 'text-white',
			outline: 'text-primary',
			error: 'text-white'
		},
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl'
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
});

type ThemedButtonButtonProps = Omit<PressableProps, 'children'> &
	VariantProps<typeof buttonVariants> & {
		title: string;
		iconLeft?: ReactElement<IconProps>;
		iconRight?: ReactElement<IconProps>;
		loading?: boolean;
		fullWidth?: boolean;
	};

export const ThemedButton = ({
	title,
	iconLeft,
	iconRight,
	fullWidth = true,
	loading = false,
	size,
	variant,
	className,
	disabled,
	...props
}: ThemedButtonButtonProps) => {
	const isDisabled = disabled || loading;

	return (
		<Pressable
			className={cn(
				buttonVariants({ variant, size }),
				fullWidth ? 'w-full' : 'self-start',
				isDisabled && 'opacity-60',
				className
			)}
			disabled={isDisabled}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<>
					{iconLeft && (
						<View>
							{cloneElement(iconLeft, {
								color: iconLeft.props.color ?? 'white'
							})}
						</View>
					)}
					<ThemedText
						numberOfLines={1}
						size="inherit"
						className={cn(textVariants({ variant, size }))}
					>
						{title}
					</ThemedText>
					{iconRight && (
						<View>
							{cloneElement(iconRight, {
								color: iconRight.props.color ?? 'white'
							})}
						</View>
					)}
				</>
			)}
		</Pressable>
	);
};
