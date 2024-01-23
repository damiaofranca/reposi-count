import styled from "styled-components";

export const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const WrapperCards = styled.div<{ totalTypeUnit: number }>`
	gap: 24px;
	display: grid;
	padding-bottom: 24px;
	grid-template-columns: ${({ totalTypeUnit }) =>
		totalTypeUnit === 4 || totalTypeUnit === 2 ? `auto auto` : `auto`};

	@media screen and (max-width: 600px) {
		grid-template-columns: auto;
	}
`;

export const WrapperGraphics = styled.div`
	display: grid;
	gap: 0px 24px;
	grid-template-columns: auto auto auto auto;

	@media screen and (max-width: 1360px) {
		gap: 24px;
		grid-template-columns: auto auto;
	}

	@media screen and (max-width: 600px) {
		grid-template-columns: auto;
	}
`;

export const ContainerHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	justify-content: space-between;
`;

export const Center = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
