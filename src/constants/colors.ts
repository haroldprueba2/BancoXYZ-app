const sharedColors = {
	primary: '#FFA500',
	secondary: '#9333EA'
};

export const colors = {
	...sharedColors,
	light: {
		background: '#F7F9FB',
		card: '#FFFFFF',
		foreground: '#0A0A0A',
		muted: '#F0F0F0',
		mutedForeground: '#737373',
		input: '#E5E5E5',
		border: '#E5E5E5',
		ring: sharedColors.secondary,
		destructive: '#E7000B',
		destructiveFocused: '#B00008',
		destructiveFocusedBackground: 'rgba(254, 242, 242, 1)'
	},

	dark: {
		background: '#0A0A0A',
		card: '#171717',
		foreground: '#FAFAFA',
		muted: '#262626',
		mutedForeground: '#A1A1A1',
		input: 'rgba(255, 255, 255, 0.1)',
		border: '#262626',
		ring: sharedColors.secondary,
		destructive: '#FF6467',
		destructiveFocused: '#FF8587',
		destructiveFocusedBackground: 'rgba(127, 29, 29, 0.2)'
	}
} as const;

export type ThemeColors = typeof colors.light | typeof colors.dark;
