import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@nextui-org/react";

import LoginUserSchema from "./schema";
import logo from "../../../assets/icons/logo.svg";
import { InputNew } from "../../../components";

import {
	Logo,
	Form,
	FormItem,
	TitleForm,
	Container,
	ContainerForm,
	ContainerSubmit,
	Subtitle,
} from "./styles";

const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const {
		errors,
		values,
		touched,
		isValid,
		handleBlur,
		handleSubmit,
		handleChange,
		validateForm,
	} = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: "",
		},
		onSubmit: async (values) => {
			setIsLoading(true);
			// make request...
			setIsLoading(false);

			navigate("/");
		},
		validationSchema: LoginUserSchema,
	});

	React.useEffect(() => {
		validateForm();
	}, []);

	return (
		<Container>
			<Logo src={logo} alt="Client Vysor" />
			<ContainerForm>
				<TitleForm>Recuperar conta</TitleForm>
				<Subtitle>
					Digite seu e-mail e enviaremos as instruções de recuperação.
				</Subtitle>
				<Form onSubmit={handleSubmit}>
					<FormItem>
						<InputNew
							name="email"
							label="Email"
							variant="bordered"
							onBlur={handleBlur}
							value={values.email}
							onChange={handleChange}
							placeholder="Digite seu e-mail"
							isInvalid={errors.email && touched.email ? true : false}
							errorMessage={errors.email && touched.email ? errors.email : ""}
						/>
					</FormItem>
					<ContainerSubmit>
						<Button
							type="submit"
							color="primary"
							variant="shadow"
							className="w-full"
							isDisabled={!isValid}
							isLoading={isLoading}
							spinner={<Spinner size="sm" />}
						>
							Enviar email
						</Button>
					</ContainerSubmit>
				</Form>
			</ContainerForm>
		</Container>
	);
};

export default ForgotPassword;
