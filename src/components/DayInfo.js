import { timeParse, timeFormat } from "d3";

let parseTime = timeParse("%Y-%m-%d");
let formatTime = timeFormat("%d/%m/%y");

export let DayInfo = ({ data, isoCode }) => {
	let isoData = data[isoCode]["data"];

	let day = isoData.map((d) => d["date"]).slice(-1);
	let dayParse = parseTime(day);
	let dayFormat = formatTime(dayParse);

	let newCases = isoData
		.map((d) => (!d["new_cases"] ? 0 : +d["new_cases"]))
		.slice(-1);

	let newDeaths = isoData
		.map((d) => (!d["new_deaths"] ? 0 : +d["new_deaths"]))
		.slice(-1);

	return (
		<>
			<div className="innerDay">
				<p>Last Update: {dayFormat}</p>
			</div>
			<div className="innerCases">
				<p>New Cases: {newCases}</p>
			</div>
			<div className="innerDeaths">
				<p>New Deaths: {newDeaths}</p>
			</div>
		</>
	);
};
