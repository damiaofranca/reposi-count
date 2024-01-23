import React from "react";

import { Title, Value, Container, ContainerInfoFlex } from "./styles";

interface ICardDashboard {
	title: string;
	value: string;
}

export const CardDashboard: React.FC<ICardDashboard> = (props) => {
	return (
		<Container className="bg-content3">
			<ContainerInfoFlex>
				<Title className="text-content2">{props.title}</Title>
				<ContainerInfoFlex style={{ alignItems: "center" }}>
					<Value>{props.value}</Value>
				</ContainerInfoFlex>
			</ContainerInfoFlex>
		</Container>
	);
};
