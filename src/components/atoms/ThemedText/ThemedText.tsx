import { Text, type TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const themedTextVariants = cva('text-foreground', {
	variants: {
		variant: {
			default: 'text-foreground',
			error: 'text-destructive'
		},
		size: {
			default: 'text-base',
			inherit: ''
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

type ThemedTextProps = TextProps &
	VariantProps<typeof themedTextVariants> & {
		className?: string;
	};

export const ThemedText = ({
	variant,
	size,
	className,
	...props
}: ThemedTextProps) => {
	return (
		<Text
			className={cn(themedTextVariants({ variant, size }), className)}
			{...props}
		/>
	);
};
