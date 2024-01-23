import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	display: flex;
	padding: 24px;
	height: fit-content;
	border-radius: 12px;
	align-items: center;
	flex-direction: column;

	@media screen and (max-width: 1280px) {
		order: -1;
		max-width: 100%;
		margin-bottom: 24px;
	}
`;

export const Title = styled.h1`
	width: 100%;
	font-size: 24px;
	font-weight: 600;
	line-height: 36px;
	font-style: normal;
	margin-bottom: 24px;
`;

export const ContainerList = styled.div`
	width: 100%;
	display: flex;
	overflow-y: auto;
	min-height: 420px;
	max-height: 420px;
	flex-direction: column;
`;

export const ListItem = styled.div`
	width: 100%;
	display: flex;
	padding: 21px 16px;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #efefef;
`;

export const TitleList = styled.h5`
	font-size: 16px;
	font-weight: 600;
	line-height: 24px;
	font-style: normal;
`;

export const LabelList = styled.label`
	margin: 0;
	font-size: 14px;
	font-weight: 500;
	line-height: 21px;
	font-style: normal;
`;

export const NoRegisteredProducts = styled.div`
	width: 100%;
	padding: 10px;
	display: flex;
	border-radius: 6px;
	align-items: center;
	justify-content: center;

	color: #e2eaed;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
	font-style: normal;
	text-align: center;
`;

export const ContainerFilter = styled.div`
	width: 100%;
	margin-bottom: 12px;
`;
