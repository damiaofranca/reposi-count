import * as Yup from "yup";

const LoginUserSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email inválido")
		.required("Campo obrigatório")
		.min(6, "O valor minímo são 6 digítos")
		.max(256, "Valor permitido exedido"),
});

export default LoginUserSchema;
