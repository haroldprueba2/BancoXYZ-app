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
		border: '#E5E5E5',
		input: '#E5E5E5',
		ring: sharedColors.secondary,
		destructive: '#E7000B',
		destructiveFocused: '#B00008',
		destructiveForeground: '#FFFFFF'
	},

	dark: {
		background: '#0A0A0A',
		card: '#171717',
		foreground: '#FAFAFA',
		muted: '#262626',
		mutedForeground: '#A1A1A1',
		border: '#FFFFFF1A',
		input: '#FFFFFF26',
		ring: sharedColors.secondary,
		destructive: '#FF6467',
		destructiveFocused: '#FF8587',
		destructiveForeground: '#0A0A0A'
	}
} as const;

export type ThemeColors = typeof colors.light | typeof colors.dark;
