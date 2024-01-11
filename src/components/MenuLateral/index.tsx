import React from "react";

import {
	MenuTitle,
	LinkAction,
	LinkContainer,
	ContainerExpanded,
	ContainerIcon,
} from "./styles";
import { StyleSheetManager } from "styled-components";
import HomeIcon from "../../assets/icons/Home";
import MarketIcon from "../../assets/icons/Market";
import { useTheme } from "../../hooks";
import StorageIcon from "../../assets/icons/Storage";

interface IMenuLateral {
	expanded?: boolean;
}

interface IRouterChildren {
	name: string;
	path: string;
	icon: JSX.Element;
}

interface IRouterLinkChildren extends IRouterChildren {
	theme: "light" | "dark";
	expanded?: boolean;
}

const LinkChildren: React.FC<IRouterLinkChildren> = ({
	path,
	name,
	theme,
	expanded,
	icon: Icon,
}) => {
	return (
		<LinkAction to={path} className={"hover:bg-content3"} theme={theme}>
			<ContainerIcon>{Icon}</ContainerIcon>
			{expanded && (
				<span style={{ color: theme === "light" ? "#739072" : "#ffff" }}>
					{name}
				</span>
			)}
		</LinkAction>
	);
};

export const MenuLateral: React.FC<IMenuLateral> = ({ expanded }) => {
	const { theme } = useTheme();
	const ROUTES_CHILDREN: IRouterChildren[] = [
		{
			path: "/",
			icon: <HomeIcon theme={theme} />,
			name: "Página Inicial",
		},
		{
			path: "/brands",
			icon: <MarketIcon theme={theme} />,
			name: "Marcas",
		},
		{
			path: "/storages",
			icon: <StorageIcon theme={theme} />,
			name: "Estoques",
		},
	];

	return (
		<StyleSheetManager shouldForwardProp={(prop) => prop !== "expanded"}>
			<ContainerExpanded
				className="bg-background"
				expanded={expanded ? true : false}
			>
				<MenuTitle className="title-menu invert">PRINCIPAL</MenuTitle>
				{ROUTES_CHILDREN && (
					<LinkContainer>
						{ROUTES_CHILDREN.map((urlPage) => (
							<LinkChildren
								theme={theme}
								key={urlPage.name}
								name={urlPage.name}
								path={urlPage.path}
								expanded={expanded}
								icon={urlPage.icon}
							/>
						))}
					</LinkContainer>
				)}
			</ContainerExpanded>
		</StyleSheetManager>
	);
};
