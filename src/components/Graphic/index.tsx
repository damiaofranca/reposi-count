import React from "react";
import ChartClients from "../ChartClients";
import { Container, ContainerChart, Header, Title } from "./styles";
import Highcharts from "highcharts";
import { ITransitionResponse } from "../../interfacers/storage";
import { getTime } from "date-fns";

interface IGraphic {
	data: ITransitionResponse[];
}

export const Graphic: React.FC<IGraphic> = ({ data }) => {
	const time = new Highcharts.Time();

	return (
		<Container className="bg-content3">
			<Header>
				<Title className="text-content2">Histórico De Transações</Title>
			</Header>
			<ContainerChart>
				<ChartClients
					viewDate="Month"
					series={[
						{
							name: "Transações",
							data: data.length
								? data.map((transaction) => [
										time.dateFormat(
											"%d/%m/%Y %H:%M:%S",
											getTime(new Date(transaction.transaction_date)) as number,
										),
										Number(transaction.transfer_quantity),
								  ])
								: [[]],
						},
					]}
				/>
			</ContainerChart>
		</Container>
	);
};
