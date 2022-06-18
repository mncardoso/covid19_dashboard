import { timeParse, timeFormat, format, scaleLinear, sum } from "d3";
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

	let reproductionRate = isoData.map((d) =>
		!d["reproduction_rate"] ? 0 : +d["reproduction_rate"]
	);
	let lastReproductionRateMax;
	for (let i = reproductionRate.length; i > 0; i -= 1) {
		if (reproductionRate[i] > 0) {
			lastReproductionRateMax = reproductionRate[i];
			break;
		}
	}

	let satus = () => {
		let last7Days = isoData.map((d) => d["new_cases"]).slice(-7);
		console.log(last7Days);
		let statusScale = scaleLinear()
			.range([0, 100000])
			.domain([0, data[isoCode]["population"]]);
		let statusLvl = Math.floor(statusScale(sum(last7Days)));
		console.log(sum(last7Days));
		console.log(statusLvl);
		return statusLvl >= 480
			? "Oh fuck!"
			: statusLvl >= 240
			? "I'm satying home"
			: statusLvl >= 120
			? "Ok! Now I'm worried"
			: statusLvl >= 60
			? "Maybe we should be worried"
			: statusLvl >= 30
			? "Things are heating up"
			: statusLvl >= 10
			? "I think we're good"
			: "W're good";
	};

	return (
		<div className={styles.data}>
			<p>{date}</p>
			<div className={styles.status}>
				<p>status</p>
				<h3>{satus()}</h3>
			</div>
			<div>
				<div className={styles.title}>
					<p>Reproduction rate</p>
					<h3>{lastReproductionRateMax}</h3>
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
