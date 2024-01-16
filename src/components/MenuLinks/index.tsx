import React from "react";
import { StyleSheetManager } from "styled-components";

import { useTheme } from "../../hooks";
import { Container, LinkAction } from "./styles";

interface IRouterChildren {
	name: string;
	path: string;
}

interface IRouterLinkChildren extends IRouterChildren {
	theme: "light" | "dark";
}

const LinkChildren: React.FC<IRouterLinkChildren> = ({ path, name, theme }) => {
	return (
		<LinkAction to={path} theme={theme}>
			<span style={{ color: theme === "light" ? "#ffff" : "#739072" }}>
				{name}
			</span>
		</LinkAction>
	);
};

export const MenuLinks: React.FC = () => {
	const { theme } = useTheme();
	const ROUTES_CHILDREN: IRouterChildren[] = [
		{
			path: "/",
			name: "Página Inicial",
		},
		{
			path: "/brands",
			name: "Marcas",
		},
		{
			path: "/storages",
			name: "Estoques",
		},
	];

	return (
		<StyleSheetManager shouldForwardProp={(prop) => prop !== "expanded"}>
			<Container>
				{ROUTES_CHILDREN && (
					<>
						{ROUTES_CHILDREN.map((urlPage) => (
							<LinkChildren
								theme={theme}
								key={urlPage.name}
								name={urlPage.name}
								path={urlPage.path}
							/>
						))}
					</>
				)}
			</Container>
		</StyleSheetManager>
	);
};
