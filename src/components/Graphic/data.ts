import Highcharts from "highcharts";
import { add, getTime } from "date-fns";

const time = new Highcharts.Time();

const clientsData = [
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 1 })))
		),
		6,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 2 })))
		),
		21,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 3 })))
		),
		16,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 4 })))
		),
		47,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 5 })))
		),
		167,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 6 })))
		),
		200,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 7 })))
		),
		220,
	],
	[
		time.dateFormat(
			"%d/%m/%Y %H:%M:%S",
			getTime(new Date(add(new Date(), { days: 8 })))
		),
		257,
	],
];

export default clientsData;
