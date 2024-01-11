/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const isValidCnpj = (cnpj: string) => {
	const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

	return cnpjRegex.test(cnpj);
};

const RegisterBrandSchema = Yup.object().shape({
	name: Yup.string()
		.required("Campo obrigatório.")
		.min(6, "O valor minímo são 6 digítos.")
		.max(256, "Valor permitido exedido."),
	cnpj: Yup.string()
		.required("Campo obrigatório.")
		.test("valid-cnpj", "CNPJ inválido.", isValidCnpj),
});

export default RegisterBrandSchema;
