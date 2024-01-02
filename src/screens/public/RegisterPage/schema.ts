import * as Yup from "yup";

const LoginUserSchema = Yup.object().shape({
	email: Yup.string().email("Email inválido.").required("Campo obrigatório."),
	password: Yup.string()
		.matches(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
			"A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.",
		)
		.required("Campo obrigatório."),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref("password")], "As senhas devem ser iguais")
		.required("Campo obrigatório."),
});

export default LoginUserSchema;
