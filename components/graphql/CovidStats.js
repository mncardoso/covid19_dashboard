import { timeParse, timeFormat, scaleLinear, format } from "d3";
import styles from "../../styles/graphql/CovidStats.module.css";

let parseTime = timeParse("%Y-%m-%d");
let formatTime = timeFormat("%d/%m/%y");

export let CovidStats = ({ data, isoCode }) => {
	let isoData = data[isoCode]["data"];

	let day = isoData.map((d) => d["date"]).slice(-1);
	let dayParse = parseTime(day);
	let date = formatTime(dayParse);

	let newCases = isoData
		.map((d) => (!d["new_cases"] ? 0 : +d["new_cases"]))
		.slice(-1);

	let newDeaths = isoData
		.map((d) => (!d["new_deaths"] ? 0 : +d["new_deaths"]))
		.slice(-1);

	let reproductionRate = isoData
		.map((d) => (!d["reproduction_rate"] ? 0 : +d["reproduction_rate"]))
		.slice(-4, -3);

	return (
		<div className={styles.data}>
			<p>{date}</p>
			<div>
				<div className={styles.title}>
					<p>Reproduction rate</p>
					<h3>{reproductionRate}</h3>
				</div>
			</div>
			<div className={styles.new}>
				<div>
					<p>New Cases</p>
					<h3>{format(",.0f")(newCases)}</h3>
				</div>
				<div>
					<p>New Deaths</p>
					<h3>{format(",.0f")(newDeaths)}</h3>
				</div>
			</div>
		</div>
	);
};
