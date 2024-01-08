import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ContainerExpanded = styled.aside<{ expanded: boolean }>`
	width: 100%;
	padding: 40px 0 0 0px;
	max-width: ${({ expanded }) => (expanded ? "276px" : "90px")};

	& > .title-menu {
		display: ${({ expanded }) => (expanded ? "block" : "none")};
	}

	@media screen and (max-width: 920px) {
		max-width: 90px !important;
	}
`;

export const MenuTitle = styled.h5`
	font-size: 12px;
	cursor: default;
	font-weight: 600;
	padding-left: 25px;
	line-height: 18.5px;
	font-family: "Montserrat", "Open Sans";

	@media screen and (max-width: 920px) {
		display: none !important;
	}
`;

export const LinkContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const LinkAction = styled(NavLink)<{theme: "light" | "dark"}>`
	width: 100%;
	height: 48px;
	border: none;
	display: flex;
	padding-left: 29px;
	align-items: center;
	background-color: transparent;

	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	text-decoration: none;
	font-family: "Open Sans";

	& span{
	opacity: 0.6;

	}

	&.active {
		box-shadow: inset -3px 0px ${({theme})=> theme === "light" ? "#739072" : "#fff"};

		& span{
		opacity: 1;
		font-weight: 600;
		}
	}

	&:first-child{
		margin-top: 12px;
	}

	@media screen and (max-width: 920px) {
		& span {
			display: none !important;
		}
	}
`;

export const ContainerIcon = styled.div`
	margin: 0 10px 0px 0px;
`;
