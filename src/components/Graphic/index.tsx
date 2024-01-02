import React from "react";
import clientsData from "./data";
import ChartClients from "../ChartClients";

import { Container, ContainerChart, Header, Title } from "./styles";

const Graphic: React.FC = () => (
	<Container className="bg-content3">
		<Header>
			<Title className="text-content2">Entrada de clientes - Dezembro</Title>
		</Header>
		<ContainerChart>
			<ChartClients
				viewDate="Month"
				series={[{ name: "Total de clientes", data: clientsData }]}
			/>
		</ContainerChart>
	</Container>
);

export default Graphic;
