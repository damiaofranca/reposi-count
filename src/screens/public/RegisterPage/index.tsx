import React from "react";
import { useFormik } from "formik";
import { Button, Spinner } from "@nextui-org/react";

import LoginUserSchema from "./schema";
import { InputNew } from "../../../components";
import logo from "../../../assets/icons/logo.svg";
import { useUserAuth } from "../../../hooks/useUserAuth";

import {
	Logo,
	Form,
	FormItem,
	LeftSide,
	Subtitle,
	RightSide,
	TitleLeft,
	TitleForm,
	Container,
	ContainerForm,
	DontHaveAccount,
	ContainerSubmit,
	DontHaveAccountContainer,
} from "./styles";

const RegisterPage: React.FC = () => {
	const { onSignUp } = useUserAuth();
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
			password: "",
			passwordConfirmation: "",
		},
		onSubmit: (values) => {
			onRegister({ email: values.email, password: values.password });
		},
		validationSchema: LoginUserSchema,
	});

	const onRegister = async (values: { email: string; password: string }) => {
		setIsLoading(true);
		await onSignUp(values);
		setIsLoading(false);
	};

	React.useEffect(() => {
		validateForm();
	}, []);

	return (
		<Container>
			<LeftSide>
				<Logo src={logo} alt="Client Vysor" />
				<TitleLeft>
					“Eficiência para o seu controle de <strong>estoque</strong>{" "}
					empresarial!”
				</TitleLeft>
				<Subtitle>
					Um sistema que proporciona controle total sobre o seu estoque.
				</Subtitle>

				<img src={logo} alt="Client Vysor" className="logo-absolute" />
			</LeftSide>
			<RightSide>
				<ContainerForm>
					<TitleForm>Registre-se</TitleForm>
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
						<FormItem>
							<InputNew
								label="Senha"
								name="password"
								type="password"
								variant="bordered"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								placeholder="Digite sua senha"
								isInvalid={errors.password && touched.password ? true : false}
								errorMessage={
									errors.password && touched.password ? errors.password : ""
								}
							/>
						</FormItem>
						<FormItem>
							<InputNew
								type="password"
								variant="bordered"
								onBlur={handleBlur}
								onChange={handleChange}
								label="Senha novamente"
								name="passwordConfirmation"
								value={values.passwordConfirmation}
								placeholder="Digite sua senha novamente"
								isInvalid={
									errors.passwordConfirmation && touched.passwordConfirmation
										? true
										: false
								}
								errorMessage={
									errors.passwordConfirmation && touched.passwordConfirmation
										? errors.passwordConfirmation
										: ""
								}
							/>
						</FormItem>

						<ContainerSubmit>
							<Button
								type="submit"
								color="primary"
								className="w-full"
								isDisabled={!isValid}
								isLoading={isLoading}
								spinner={<Spinner size="sm" />}
							>
								Registrar
							</Button>
						</ContainerSubmit>
					</Form>
				</ContainerForm>
				<DontHaveAccountContainer>
					<DontHaveAccount to={"/login"}>
						Já têm uma conta? <strong>Clique aqui.</strong>
					</DontHaveAccount>
				</DontHaveAccountContainer>
			</RightSide>
		</Container>
	);
};

export default RegisterPage;
