import * as Yup from "yup";

const RegisterStoreSchema = Yup.object().shape({
	name: Yup.string()
		.required("Campo obrigatório")
		.min(6, "O valor minímo são 6 digítos")
		.max(256, "Valor permitido exedido"),
	city: Yup.string()
		.required("Campo obrigatório")
		.min(3, "O valor minímo são 3 três digitos"),
	lat: Yup.string().required("Campo obrigatório"),
	lng: Yup.string().required("Campo obrigatório"),
	totalMount: Yup.string().required("Campo obrigatório"),
});

export default RegisterStoreSchema;
