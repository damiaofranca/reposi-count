export const formatCNPJ = (input: string) => {
	// Remove caracteres não numéricos
	const numericValue = input.replace(/\D/g, "");

	// Adiciona pontos e barras conforme o usuário digita
	const formattedValue = numericValue.replace(
		/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
		"$1.$2.$3/$4-$5",
	);

	return formattedValue;
};
