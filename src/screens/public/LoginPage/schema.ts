import * as Yup from "yup";

const LoginUserSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email inválido")
		.required("Campo obrigatório")
		.min(6, "O valor minímo são 6 digítos")
		.max(256, "Valor permitido exedido"),
	password: Yup.string()
		.required("Campo obrigatório")
		.min(8, "O valor minímo são 8 digítos")
		.max(256, "Valor permitido exedido"),
});

export default LoginUserSchema;
