import { timeParse, timeFormat } from "d3";

let parseTime = timeParse("%Y-%m-%d");
let formatTime = timeFormat("%d/%m/%y");

export let DayInfo = ({ data, isoCode }) => {
	let isoData = data[isoCode]["data"];

	let newCases = isoData
		.map((d) => (!d["new_cases"] ? 0 : +d["new_cases"]))
		.slice(-1);

	let newDeaths = isoData
		.map((d) => (!d["new_deaths"] ? 0 : +d["new_deaths"]))
		.slice(-1);

	let day = isoData.map((d) => parseTime(d["date"]));
	let lastDay = isoData.map((d) => d["date"]).slice(-1);

	return (
		<>
			<p>{formatTime(day.slice(-1))}</p>
			<p>Last Update: {lastDay}</p>
			<p>New Cases: {newCases}</p>
			<p>New Deaths: {newDeaths}</p>
		</>
	);
};
