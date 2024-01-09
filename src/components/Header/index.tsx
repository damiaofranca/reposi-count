import React from "react";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

//icons
import MinifyIcon from "../../assets/icons/minify-bar.svg";
import LogoWhiteIcon from "../../assets/icons/logo-white.svg";
import ExpandedIcon from "../../assets/icons/expanded-bar.svg";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

import { useAuth, useTheme } from "../../hooks";

import {
	Logo,
	NameUser,
	LeftSide,
	Container,
	SwitchViewSideBar,
} from "./styles";

interface HeaderProps {
	sideExpanded: boolean;
	onExpanded: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sideExpanded, onExpanded }) => {
	const { onSignOut } = useAuth();
	const navigate = useNavigate();
	const { theme, onChangeTheme } = useTheme();

	const signOut = async () => {
		await onSignOut();
		navigate("/login");
	};

	const onNavigateToAccount = async () => {
		navigate("/account");
	};

	return (
		<Container className="bg-content4">
			<Logo src={LogoWhiteIcon} alt="Client Vysor" />
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "imgurl"}>
				<SwitchViewSideBar
					onClick={onExpanded}
					imgurl={sideExpanded ? ExpandedIcon : MinifyIcon}
				/>
			</StyleSheetManager>

			<LeftSide>
				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<Button variant="light" className="py-2">
							<NameUser>Damião</NameUser>
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Ações">
						<DropdownItem key="profile" onClick={onNavigateToAccount}>
							Perfil
						</DropdownItem>
						<DropdownItem
							key="theme"
							onClick={() => {
								onChangeTheme();
							}}
						>
							Mudar de tema: {theme === "light" ? "claro" : "escuro"}
						</DropdownItem>
						<DropdownItem key="signOut" onClick={signOut}>
							Sair
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</LeftSide>
		</Container>
	);
};
