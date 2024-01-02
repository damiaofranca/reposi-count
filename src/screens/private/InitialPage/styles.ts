import styled from "styled-components";

export const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const WrapperCards = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const WrapperGraphics = styled.div`
	display: flex;

	@media screen and (max-width: 1280px) {
		flex-direction: column;
	}
`;
