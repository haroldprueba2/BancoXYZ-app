export const formatCurrency = (
	value: number,
	currency: string,
	maximumFractionDigits = 2,
	locale = 'en-US'
): string => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		maximumFractionDigits
	}).format(value);
};
