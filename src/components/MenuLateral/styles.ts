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
	color: #4e61c9;
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

export const LinkAction = styled(NavLink)`
	width: 100%;
	height: 48px;
	border: none;
	display: flex;
	padding-left: 29px;
	align-items: center;
	background-color: transparent;
	

	color: #4e61c9;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	font-family: "Open Sans";
	text-decoration: none;

	&.active {
		font-weight: 600;
		box-shadow: inset -3px 0px #4e61c9;
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

export const LinkIcon = styled.img`
	width: 20px;
	height: 20px;
	margin: 0 15px 0 5px;
`;
