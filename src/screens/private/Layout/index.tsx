import React from "react";
import { Outlet } from "react-router-dom";
import { Header, MenuLateral } from "../../../components";

import { Container, ContainerMain, Main } from "./styles";

const Layout: React.FC = () => {
	const [handlerSideBar, setHandlerSideBar] = React.useState<boolean>(true);

	return (
		<Container>
			<Header
				sideExpanded={handlerSideBar}
				onExpanded={() => setHandlerSideBar(!handlerSideBar)}
			/>
			<ContainerMain>
				<MenuLateral expanded={handlerSideBar} />
				<Main className="bg-content1">
					<Outlet />
				</Main>
			</ContainerMain>
		</Container>
	);
};

export default Layout;
