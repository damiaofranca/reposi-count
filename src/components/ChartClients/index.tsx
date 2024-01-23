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
				gridLineColor: theme === "light" ? "#739072" : "#ffff",
				labels: {
					style: {
						color: theme === "light" ? "#739072" : "#ffff",
					},
				},
				title: {
					text: "Total de transações",
					style: {
						color: theme === "light" ? "#739072" : "#ffff",
					},
				},
			},
			series: series,
			lang: optionsChart.lang,
			xAxis: {
				...optionsChart.xAxis,
				lineColor: theme === "light" ? "#739072" : "#ffff",
				labels: {
					...optionsChart.xAxis.labels,
					style: {
						color: theme === "light" ? "#739072" : "#ffff",
					},
				},
			},
			legend: optionsChart.legend,
			subtitle: optionsChart.subtitle,
			responsive: optionsChart.responsive,
			plotOptions: {
				series: {
					...optionsChart.plotOptions.series,
					color: theme === "light" ? "#739072" : "#ffff",
					pointIntervalUnit: viewDate && viewDate === "Day" ? "day" : "month",
				},
			},
			accessibility: optionsChart.accessibility,
		};

		setOptions(_options);
	}, [series, viewDate, theme]);

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
