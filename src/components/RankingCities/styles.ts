import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	display: flex;
	max-width: 25%;
	margin-left: 24px;
	border-radius: 12px;
	align-items: center;
	flex-direction: column;
	padding: 40px 40px 12px 40px;

	@media screen and (max-width: 1840px) {
		padding: 24px 24px 12px 24px;
	}

	@media screen and (max-width: 1280px) {
		order: -1;
		max-width: 100%;
		margin-left: 0px;
		margin-bottom: 24px;
	}
`;

export const Title = styled.h1`
	width: 100%;
	font-size: 24px;
	font-weight: 600;
	line-height: 36px;
	font-style: normal;
	margin-bottom: 53px;
`;

export const ContainerList = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	overflow-y: auto;
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

export const NoRegisteredStores = styled.div`
	width: 100%;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #2382a0;
	border-radius: 6px;

	color: #e2eaed;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
	font-style: normal;
	text-align: center;
`;
