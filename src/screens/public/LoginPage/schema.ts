/* eslint-disable no-useless-escape */
import * as Yup from "yup";

const LoginUserSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email inválido.")
		.required("Campo obrigatório.")
		.min(6, "O valor minímo são 6 digítos.")
		.max(256, "Valor permitido exedido."),
	password: Yup.string()
		.required("Campo obrigatório.")
		.matches(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
			"A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.",
		),
});

export default LoginUserSchema;
