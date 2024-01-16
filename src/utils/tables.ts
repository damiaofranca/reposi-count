const columnsStorage = [
	{
		key: "identifier",
		label: "Identificador",
	},
	{
		key: "cep",
		label: "CEP",
	},
	{
		key: "uf",
		label: "Estado",
	},
	{
		key: "city",
		label: "Cidade",
	},
	{
		key: "district",
		label: "Bairro",
	},
	{
		key: "street",
		label: "Rua",
	},
	{
		key: "local_number",
		label: "Numéro",
	},
	{
		key: "actions",
		label: "Ações",
	},
];

const columnsBrand = [
	{
		key: "name",
		label: "Nome",
	},
	{
		key: "cnpj",
		label: "CNPJ",
	},

	{
		key: "actions",
		label: "Ações",
	},
];

const columnsBrandAdmin = [
	{
		key: "name",
		label: "Nome",
	},
	{
		key: "cnpj",
		label: "CNPJ",
	},

	{
		key: "actions",
		label: "Ações",
	},
];

const columnsProducts = [
	{
		key: "name",
		label: "Nome",
	},
	{
		key: "brand",
		label: "Marca",
	},

	{
		key: "quantity",
		label: "Quantidades",
	},

	{
		key: "type_of_quantity",
		label: "Quantidades por",
	},

	{
		key: "type_of_product",
		label: "Tipo de produto",
	},

	{
		key: "actions",
		label: "Ações",
	},
];

export { columnsStorage, columnsBrand, columnsBrandAdmin, columnsProducts };
