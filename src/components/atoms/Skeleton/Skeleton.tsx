import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { cn } from '@/utils';

interface SkeletonProps {
	className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
	const [opacity] = useState(() => new Animated.Value(0.4));

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 1,
					duration: 700,
					useNativeDriver: true
				}),
				Animated.timing(opacity, {
					toValue: 0.4,
					duration: 700,
					useNativeDriver: true
				})
			])
		);

		animation.start();

		return () => animation.stop();
	}, [opacity]);

	return (
		<Animated.View
			className={cn('h-8 w-full rounded-lg bg-muted', className)}
			style={{ opacity }}
		/>
	);
};
