import styled from "styled-components";

export const Container = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 16px 40px 16px 29px;
`;

export const Logo = styled.img`
	width: auto;
	height: 32px;
	margin-right: 22px;

	@media screen and (max-width: 770px) {
		height: 20px;
		margin-right: 20px;
	}

	@media screen and (max-width: 480px) {
		display: none;
	}
`;

export const SwitchViewSideBar = styled.button<{ imgurl: string }>`
	width: 24px;
	height: 24px;
	border: none;
	cursor: pointer;
	background: url(${({ imgurl }) => imgurl});

	@media screen and (max-width: 770px) {
		display: none;
	}
`;

export const LeftSide = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const NameUser = styled.h5`
	color: #ffffff;
	font-size: 16px;
	font-weight: 300;
	line-height: 24px;
	margin: 0 16px 0 0;
	font-family: "Open Sans";
`;

export const ContainerUserInfo = styled.div`
	display: flex;
	cursor: pointer;
	position: relative;
	align-items: center;
`;
