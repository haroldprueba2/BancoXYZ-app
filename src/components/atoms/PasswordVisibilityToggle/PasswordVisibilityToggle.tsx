import { TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';

type PasswordVisibilityToggleProps = {
	visible: boolean;
	focused: boolean;
	hasError: boolean;
	disabled: boolean;
	onPress: () => void;
};

export const PasswordVisibilityToggle = ({
	visible,
	focused,
	hasError,
	disabled,
	onPress
}: PasswordVisibilityToggleProps) => {
	const colors = useThemeColors();

	const iconColor = hasError
		? colors.destructiveFocused
		: focused
			? colors.ring
			: colors.mutedForeground;

	return (
		<TouchableOpacity
			onPress={onPress}
			className="absolute right-1 top-0 bottom-0 w-11 items-center justify-center"
			disabled={disabled}
			accessibilityRole="button"
			accessibilityLabel={visible ? 'Hide password' : 'Show password'}
		>
			{visible ? (
				<EyeIcon size={20} color={iconColor} />
			) : (
				<EyeSlashIcon size={20} color={iconColor} />
			)}
		</TouchableOpacity>
	);
};
