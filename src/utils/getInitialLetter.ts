export const getInitialLetter = (value: string) => {
	if (!value) return '';
	const normalized = value.trim();
	return normalized.charAt(0).toUpperCase();
};
