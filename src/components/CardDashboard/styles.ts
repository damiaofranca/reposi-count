import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	padding: 32px;
	margin-right: 24px;
	border-radius: 12px;
	margin-bottom: 24px;
	max-width: calc(25% - 24px);

	&:nth-child(4) {
		max-width: 25%;
		margin-right: 0;
	}

	@media screen and (max-width: 1840px) {
		padding: 24px;
	}

	@media screen and (max-width: 1720px) {
		max-width: calc(50% - 24px);

		&:nth-child(2),
		&:nth-child(4) {
			max-width: 50%;
			margin-right: 0;
		}
	}

	@media screen and (max-width: 1032px) {
		margin-right: 0 !important;
		max-width: 100% !important;
	}

	/*@media screen and (min-width: 1940px) {
		&:nth-child(3),
		&:nth-child(4) {
			margin-right: 24px;
		}
	}

	@media screen and (max-width: 1545px) {
		max-width: calc(50% - 24px);
	}

	@media screen and (max-width: 1080px) {
		max-width: calc(100% - 24px);
	} */

	@media screen and (max-width: 432px) {
		padding: 16px;
	}
`;

export const Icon = styled.img`
	width: 28px;
	height: 28px;
	margin-bottom: 8px;
`;
export const ContainerInfoFlex = styled.div`
	display: flex;
`;

export const ContainerInfoColumn = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h1`
	font-size: 18px;
	font-weight: 600;
	line-height: 27px;
	margin-bottom: 4px;
	font-style: normal;
`;

export const SubTitle = styled.h1<{ metric: "growth" | "middle" | "down" }>`
	margin: 0;
	display: flex;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	align-items: center;
	word-break: keep-all;

	& > label {
		margin: 0;
		font-size: 14px;
		line-height: 21px;
		word-break: keep-all;
		font-weight: 600 !important;
		color: ${({ metric }) =>
			metric === "growth"
				? "#00A843"
				: metric === "middle"
				? "#F3D11B"
				: "#E54B4B"};
	}
`;

export const ImageMetric = styled.img`
	width: 16px;
	height: 16px;
	margin-left: 5px;
`;

export const Value = styled.h2`
	margin: 0;
	color: #4f4f4f;
	font-size: 32px;
	font-weight: 700;
	line-height: 42px;
	font-style: normal;
`;
