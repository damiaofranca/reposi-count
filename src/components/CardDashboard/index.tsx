import React from "react";

import {
	IconContainer,
	Title,
	Value,
	SubTitle,
	Container,
	ImageMetric,
	ContainerInfoFlex,
	ContainerInfoColumn,
} from "./styles";

//icons
import MetricUpIcon from "../../assets/icons/metric-up.svg";
import MetricDownIcon from "../../assets/icons/metric-down.svg";
import MetricStableIcon from "../../assets/icons/metric-stable.svg";
import { StyleSheetManager } from "styled-components";
//icons

interface ICardDashboard {
	title: string;
	value: string;
	subtitle: string;
	icon: JSX.Element;
	valueMetric: number;
	metric: "growth" | "middle" | "down";
}

export const CardDashboard: React.FC<ICardDashboard> = (props) => {
	return (
		<Container className="bg-content3">
			<ContainerInfoFlex>
				<ContainerInfoColumn>
					<IconContainer title={props.title}>{props.icon}</IconContainer>
					<Title className="text-content2">{props.title}</Title>
					<StyleSheetManager shouldForwardProp={(prop) => prop !== "metric"}>
						<SubTitle metric={props.metric} className="text-content2">
							{props.subtitle} de &nbsp;<label>{props.valueMetric}%</label>
							<ImageMetric
								src={
									props.metric === "growth"
										? MetricUpIcon
										: props.metric === "middle"
										? MetricStableIcon
										: MetricDownIcon
								}
								alt={props.metric}
							/>
						</SubTitle>
					</StyleSheetManager>
				</ContainerInfoColumn>
				<ContainerInfoFlex style={{ alignItems: "center" }}>
					<Value>{props.value}</Value>
				</ContainerInfoFlex>
			</ContainerInfoFlex>
		</Container>
	);
};
