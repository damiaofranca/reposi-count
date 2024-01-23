/* eslint-disable no-useless-escape */
export const formatCNPJ = (input: string) => {
	const numericValue = input.replace(/\D/g, "");

	const formattedValue = numericValue.replace(
		/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
		"$1.$2.$3/$4-$5",
	);

	return formattedValue;
};

export const isValidCnpj = (cnpj: string) => {
	const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

	return cnpjRegex.test(cnpj);
};
