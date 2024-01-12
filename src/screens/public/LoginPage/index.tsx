import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@nextui-org/react";

import LoginUserSchema from "./schema";
import { useTheme } from "../../../hooks";
import LogoIcon from "../../../assets/icons/logo.svg";
import { useAuth } from "../../../hooks/useAuth";
import { InputNew } from "../../../components";
import LogoWhiteIcon from "../../../assets/icons/logo-white.svg";

import {
	Logo,
	Form,
	FormItem,
	TitleForm,
	Container,
	ContainerForm,
	ForgotPassword,
	ContainerSubmit,
	DontHaveAccount,
	ForgotPasswordContainer,
	DontHaveAccountContainer,
	ContainerCenter,
	ContainerLogo,
} from "./styles";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();
	const { onSignIn } = useAuth();
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
		},
		onSubmit: () => {
			_onLogin();
		},
		validationSchema: LoginUserSchema,
	});

	const _onLogin = async () => {
		setIsLoading(true);
		await onSignIn({ email: values.email, password: values.password });
		setIsLoading(false);
		navigate("/");
	};

	React.useEffect(() => {
		validateForm();
	}, []);

	return (
		<Container className="bg-background">
			<ContainerCenter>
				<ContainerLogo>
					<Logo
						alt="Client Vysor"
						src={theme === "light" ? LogoIcon : LogoWhiteIcon}
					/>
				</ContainerLogo>
				<ContainerForm>
					<TitleForm className="text-content2">Login</TitleForm>
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
						<ForgotPasswordContainer>
							<ForgotPassword to={"/forgot-password"}>
								Esqueceu a senha ?
							</ForgotPassword>
						</ForgotPasswordContainer>

						<ContainerSubmit>
							<Button
								type="submit"
								color="primary"
								variant="shadow"
								className="w-full"
								isDisabled={!isValid}
								isLoading={isLoading}
								spinner={<Spinner size="sm" color="danger" />}
							>
								Entrar
							</Button>
						</ContainerSubmit>
					</Form>
				</ContainerForm>
				<DontHaveAccountContainer>
					<DontHaveAccount to={"/register"} className="text-content2">
						Não têm uma conta? <strong>Registre-se.</strong>
					</DontHaveAccount>
				</DontHaveAccountContainer>
			</ContainerCenter>
		</Container>
	);
};

export default LoginPage;
