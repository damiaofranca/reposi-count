/* eslint-disable no-useless-escape */
import * as Yup from "yup";
import { cep } from "../../utils/regexs";

export const isValidCep = (cnpj: string) => {
	return cep.test(cnpj);
};

const RegisterStorageSchema = Yup.object().shape({
	identifier: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 letras.")
		.max(256, "Valor permitido exedido."),
	cep: Yup.string()
		.required("Campo obrigatório.")
		.test("valid-cep", "CEP inválido.Ex: 99999-999", isValidCep),
	city: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 letras.")
		.max(256, "Valor permitido exedido."),
	district: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 letras.")
		.max(256, "Valor permitido exedido."),
	uf: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 2 letras.")
		.max(256, "Valor permitido exedido."),
	street: Yup.string()
		.required("Campo obrigatório.")
		.min(2, "O valor minímo são 2 letras.")
		.max(256, "Valor permitido exedido."),
	localNumber: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 digíto.")
		.max(256, "Valor permitido exedido."),
});

export default RegisterStorageSchema;
