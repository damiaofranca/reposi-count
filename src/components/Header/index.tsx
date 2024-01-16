import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import LogoWhiteIcon from "../../assets/icons/logo-white.svg";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

import { useAuth, useTheme } from "../../hooks";

import { MenuLinks } from "../MenuLinks";
import { Container, LeftSide, Logo, NameUser, RightSide } from "./styles";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
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
			<LeftSide>
				<Logo src={LogoWhiteIcon} alt="Client Vysor" />
				<MenuLinks />
			</LeftSide>

			<RightSide>
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
			</RightSide>
		</Container>
	);
};
