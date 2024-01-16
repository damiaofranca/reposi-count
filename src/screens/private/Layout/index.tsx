import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../../components";

import { Container, ContainerMain, Main } from "./styles";

const Layout: React.FC = () => {
	return (
		<Container>
			<Header />
			<ContainerMain>
				<Main className="bg-content1">
					<Outlet />
				</Main>
			</ContainerMain>
		</Container>
	);
};

export default Layout;
