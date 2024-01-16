/* eslint-disable no-useless-escape */
import * as Yup from "yup";
import { cep } from "../../utils/regexs";

export const isValidCep = (cnpj: string) => {
	return cep.test(cnpj);
};

const RegisterProductSchema = Yup.object().shape({
	name: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 letras.")
		.max(256, "Valor permitido exedido."),
	brand: Yup.string().required("Campo obrigatório."),
	quantity: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 1 letras.")
		.max(256, "Valor permitido exedido."),
	type_of_product: Yup.string()
		.required("Campo obrigatório.")
		.min(1, "O valor minímo são 2 letras.")
		.max(256, "Valor permitido exedido."),
	type_of_quantity: Yup.string()
		.matches(/^(KG|UNI|LTS|LOTES)$/, "Valor inválido")
		.required("Campo obrigatório."),
});
export default RegisterProductSchema;
