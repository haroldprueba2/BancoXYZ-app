export const formatAmount = (value: string) => {
	const [integerPart, decimalPart] = value.split('.');
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return decimalPart === undefined
		? formattedInteger
		: `${formattedInteger}.${decimalPart}`;
};
