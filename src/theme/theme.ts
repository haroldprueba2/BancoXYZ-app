import { vars } from 'nativewind';
import { colors, type ThemeColors } from '@/constants/colors';

const createThemeVars = (themeColors: ThemeColors) =>
	vars({
		'--primary': colors.primary,
		'--secondary': colors.secondary,
		'--background': themeColors.background,
		'--card': themeColors.card,
		'--foreground': themeColors.foreground,
		'--muted': themeColors.muted,
		'--muted-foreground': themeColors.mutedForeground,
		'--input': themeColors.input,
		'--ring': themeColors.ring,
		'--destructive': themeColors.destructive,
		'--destructive-focused': themeColors.destructiveFocused,
		'--destructive-focused-background':
			themeColors.destructiveFocusedBackground,
		'--destructive-foreground': themeColors.destructiveForeground
	});

export const themes = {
	light: createThemeVars(colors.light),
	dark: createThemeVars(colors.dark)
};
