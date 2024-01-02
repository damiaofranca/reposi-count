import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	padding: 50px;
	min-height: 100vh;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 968px) {
		padding: 32px;
	}
`;

export const Logo = styled.img`
	height: 32px;
	width: fit-content;
	margin-bottom: 46px;

	@media screen and (max-width: 920px) {
		margin-bottom: 120px;
	}
`;

export const ContainerForm = styled.div`
	width: 100%;
	display: flex;
	max-width: 520px;
	flex-direction: column;
`;

export const TitleForm = styled.h1`
	color: #060513;
	font-size: 34px;
	font-weight: 700;
	margin-bottom: 12px;

	font-family: "Open Sans";
`;

export const Subtitle = styled.h5`
	color: #7070ab;
	font-size: 14px;
	font-weight: 300;
	margin-bottom: 12px;

	font-family: "Open Sans";
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;
`;

export const ContainerSubmit = styled.div`
	width: 100%;
	margin-bottom: 35px;

	&:last-child {
		margin: 0;
	}
`;

export const DontHaveAccount = styled(Link)`
	color: #060513;
	font-size: 13px;
	font-weight: 400;
	font-family: "Open Sans";
`;
