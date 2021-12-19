import { timeParse, timeFormat } from "d3";

let parseDate = timeParse("%Y-%m-%d");
let dayFormater = timeFormat("%d/%m/%y");

export let DayInfo = ({ data, isoCode }) => {
	let isoData = data[isoCode]["data"];

	let newCases = isoData
		.map((d) => (!d["new_cases"] ? 0 : +d["new_cases"]))
		.slice(-1);

	let newDeaths = isoData
		.map((d) => (!d["new_deaths"] ? 0 : +d["new_deaths"]))
		.slice(-1);

	// let day = isoData.map((d) => parseDate(d["date"]));
	let day = isoData.map((d) => d["date"]);
	let lastDay = day.slice(-1);

	return (
		<>
			{/* <p>{dayFormater(lastDay)}</p> */}
			<p>Last Update: {lastDay}</p>
			<p>New Cases: {newCases}</p>
			<p>New Deaths: {newDeaths}</p>
		</>
	);
};
