import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	padding: 32px;
	border-radius: 12px;

	@media screen and (max-width: 1840px) {
		padding: 24px;
	}

	@media screen and (max-width: 432px) {
		padding: 16px;
	}
`;

export const ContainerInfoFlex = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Title = styled.h1`
	font-size: 18px;
	font-weight: 600;
	line-height: 42px;
	font-style: normal;
`;

export const Value = styled.h2`
	margin: 0;
	color: #4f4f4f;
	font-size: 32px;
	font-weight: 700;
	line-height: 42px;
	font-style: normal;
`;
