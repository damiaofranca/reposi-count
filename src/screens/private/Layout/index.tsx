import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components/Header";

import { Container, ContainerMain, Main } from "./styles";

export const Layout: React.FC = () => {
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
