export const isValidAmount = (value: string) => {
	const [integer, decimals] = value.split('.');

	return (
		/^\d*$/.test(integer) &&
		(decimals === undefined || /^\d{0,2}$/.test(decimals))
	);
};
