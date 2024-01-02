import React from "react";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { useUserAuth } from "../../hooks/useUserAuth";
import { getFirstNameFromEmail } from "../../utils/getFirstName";

//icons
import LogoIcon from "../../assets/icons/logo.svg";
import MinifyIcon from "../../assets/icons/minify-bar.svg";
import LogoWhiteIcon from "../../assets/icons/logo-white.svg";
import ExpandedIcon from "../../assets/icons/expanded-bar.svg";

import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

import { useTheme } from "../../hooks";

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
	const navigate = useNavigate();
	const { theme, onChangeTheme } = useTheme();
	const { onSignOut, userLogged } = useUserAuth();

	const signOut = async () => {
		await onSignOut();
		navigate("/login");
	};

	const onNavigateToAccount = async () => {
		navigate("/account");
	};

	return (
		<Container className="bg-content4">
			<Logo
				src={theme === "light" ? LogoIcon : LogoWhiteIcon}
				alt="Client Vysor"
			/>
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "imgurl"}>
				<SwitchViewSideBar
					onClick={onExpanded}
					imgurl={sideExpanded ? ExpandedIcon : MinifyIcon}
					className={theme === "light" ? "filter invert" : ""}
				/>
			</StyleSheetManager>

			<LeftSide>
				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<Button variant="light">
							<NameUser>
								{getFirstNameFromEmail(userLogged?.email || "")}
							</NameUser>
							<Avatar
								{...(userLogged?.providerData[0].photoURL
									? { src: userLogged?.providerData[0].photoURL }
									: { name: userLogged?.providerData[0].email || "" })}
							/>
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Ações">
						<DropdownItem key="profile" onClick={onNavigateToAccount}>
							Perfil
						</DropdownItem>
						<DropdownItem key="theme" onClick={onChangeTheme}>
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
