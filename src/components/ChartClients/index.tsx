import React from "react";
import Highcharts from "highcharts";
import optionsChart from "../../utils/optionsChart";
import { WatchDimentions } from "../WatchDimentions";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "../../hooks";

interface IChartClients {
	viewDate?: "Day" | "Month";
	series: {
		name: string;
		data: any[];
	}[];
}

const ChartClients: React.FC<IChartClients> = ({ viewDate, series }) => {
	const { theme } = useTheme();
	const chartRef = React.useRef<any>(null);
	const [options, setOptions] = React.useState<any>({});

	React.useEffect(() => {
		const _options = {
			title: {
				y: 40,
				x: 18,
				text: "",
				margin: 50,
				align: "left",
			},
			credits: {
				enabled: false,
			},
			chart: {
				borderWidth: 1,
				borderColor: "transparent",
				backgroundColor: "transparent",
			},
			yAxis: {
				...optionsChart.yAxis,
				title: {
					text: "Total de clientes",
					style: {
						color: "#d9ddf1",
					},
				},
			},
			series: series,
			lang: optionsChart.lang,
			xAxis: optionsChart.xAxis,
			legend: optionsChart.legend,
			subtitle: optionsChart.subtitle,
			responsive: optionsChart.responsive,
			plotOptions: {
				series: {
					...optionsChart.plotOptions.series,
					pointIntervalUnit: viewDate && viewDate === "Day" ? "day" : "month",
				},
			},
			accessibility: optionsChart.accessibility,
		};

		setOptions(_options);
	}, [series]);

	return (
		<WatchDimentions>
			{(dimentions) => {
				if (chartRef)
					chartRef?.current?.chart?.setSize(
						dimentions.width,
						dimentions.height,
					);

				return (
					<div style={{ ...dimentions }}>
						<HighchartsReact
							ref={chartRef}
							options={options}
							highcharts={Highcharts}
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
				);
			}}
		</WatchDimentions>
	);
};

export default ChartClients;
