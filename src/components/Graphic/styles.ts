import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	padding: 40px;
	min-height: 672px;
	border-radius: 12px;
	flex-direction: column;
	width: calc(75% - 24px);

	@media screen and (max-width: 1840px) {
		padding: 24px;
	}

	@media screen and (max-width: 1280px) {
		width: 100%;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 32px;
`;

export const Title = styled.h5`
	font-size: 24px;
	font-weight: 600;
	line-height: 36px;
	font-style: normal;
`;

export const Icon = styled.img`
	width: 16px;
	height: 16px;
	cursor: pointer;

	& .from-left {
		margin-right: 8px;
	}
	& .from-right {
		margin-left: 8px;
	}
`;

export const ContainerChart = styled.div`
	flex: 1;
`;
