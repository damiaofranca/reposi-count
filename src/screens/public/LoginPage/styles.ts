import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	padding: 50px;
	min-height: 100vh;
	align-items: center;
	justify-content: center;
	
	@media screen and (max-width: 968px) {
		padding: 32px;
	}
`;


export const ContainerCenter = styled.div`
width: 100%;
display: flex;
max-width: 420px;
flex-direction: column;
`

export const ContainerLogo = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

export const Logo = styled.img`
	height: 32px;
	width: fit-content;
	margin-bottom: 42px;
`;

export const ContainerForm = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const TitleForm = styled.h1`
	font-size: 34px;
	font-weight: 700;
	margin-bottom: 32px;

	font-family: "Open Sans";
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 16px;
	flex-direction: column;

	&:last-child {
		margin-bottom: 24px;
	}
`;

export const ForgotPasswordContainer = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 32px;
	justify-content: flex-end;
`;

export const ForgotPassword = styled(Link)`
	color: #c6c6d3;
	font-size: 13px;
	font-weight: 500;
	font-family: "Open Sans";
`;

export const ContainerSubmit = styled.div`
	width: 100%;
	margin-bottom: 35px;

	&:last-child {
		margin: 0;
	}
`;

export const DontHaveAccountContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
`;

export const DontHaveAccount = styled(Link)`
	font-size: 13px;
	font-weight: 400;
	margin-top: 18px;
	font-family: "Open Sans";
`;
