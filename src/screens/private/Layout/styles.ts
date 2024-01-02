import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

export const ContainerMain = styled.div`
	width: 100%;
	display: flex;
`;

export const Main = styled.div`
	width: 100%;
	padding: 40px;
	overflow-y: auto;
	position: relative;
	min-height: calc(100vh - 72px);
`;
