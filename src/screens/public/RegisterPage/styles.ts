import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	padding: 50px;
	min-height: 100vh;

	@media screen and (max-width: 968px) {
		padding: 32px;
	}
`;

export const LeftSide = styled.div`
	width: 100%;
	max-width: 583px;
	overflow: hidden;
	position: relative;
	padding: 42px 38px;
	border-radius: 24px;
	background: linear-gradient(137deg, #c9c9ee, #efeffd, #c9deeea3);

	display: flex;
	flex-direction: column;

	& > .logo-absolute {
		bottom: 0;
		right: -120px;
		cursor: default;
		position: absolute;
		pointer-events: none;

		width: auto;
		height: 200px;
		filter: opacity(0.2);
	}

	@media screen and (max-width: 868px) {
		display: none;
	}
`;

export const RightSide = styled.div`
	width: 100%;
	padding: 38px 92px;
	border-radius: 24px;

	display: flex;
	align-items: center;
	flex-direction: column;

	@media screen and (max-width: 1200px) {
		padding: 38px 46px;
	}

	@media screen and (max-width: 868px) {
		width: 100%;
	}

	@media screen and (max-width: 480px) {
		padding: 38px 0px;
	}
`;

export const Logo = styled.img`
	height: 32px;
	width: fit-content;
	margin-bottom: 90px;

	@media screen and (max-width: 920px) {
		margin-bottom: 120px;
	}
`;
export const TitleLeft = styled.h1`
	color: #060513;
	font-size: 38px;
	font-weight: 700;
	margin-bottom: 28px;
	font-family: "Open Sans";

	& > strong {
		color: #3737e7;
	}
`;

export const Subtitle = styled.h5`
	color: #7070ab;
	font-size: 18px;
	font-weight: 300;

	font-family: "Open Sans";
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

export const ContainerSubmit = styled.div`
	width: 100%;
	margin-top: 24px;
	margin-bottom: 35px;
`;

export const DontHaveAccountContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
`;

export const DontHaveAccount = styled(Link)`
	color: #060513;
	font-size: 13px;
	font-weight: 400;
	font-family: "Open Sans";
`;
