import styles from "@/components/graphs/styles/CovidStats.module.css";
import { DATA_Function } from "@/types/types";
import * as d3 from "d3";

const parseTime = d3.timeParse("%Y-%m-%d");
const formatTime = d3.timeFormat("%d/%m/%y");

export const CovidStats: DATA_Function = ({ data, population }) => {
	const day = data.map((d) => d.date).slice(-1)[0];
	const dayParse = day ? parseTime(day) : null;
	const date = dayParse ? formatTime(dayParse) : null;

	const newCases = data
		.map((d) => (!d.new_cases ? 0 : +d.new_cases))
		.slice(-1)[0];

	const newDeaths = data
		.map((d) => (!d.new_deaths ? 0 : +d.new_deaths))
		.slice(-1)[0];

	const reproductionRate = data.map((d) =>
		!d.reproduction_rate ? 0 : +d.reproduction_rate
	);

	const lastReproductionRate = reproductionRate.reverse().find((rt) => rt > 0);

	const getStatusLvl = () => {
		const last7Days = data.map((d) => d.new_cases).slice(-7);
		const statusScale = d3
			.scaleLinear()
			.range([0, 100000])
			.domain([0, population]);
		const statusLvl = Math.floor(statusScale(d3.sum(last7Days)));
		return statusLvl >= 480
			? 6
			: statusLvl >= 240
			? 5
			: statusLvl >= 120
			? 4
			: statusLvl >= 60
			? 3
			: statusLvl >= 30
			? 2
			: statusLvl >= 10
			? 1
			: 0;
	};

	const statusLvl = getStatusLvl();

	const getStatus = () => {
		return statusLvl === 6
			? "lvl6 > 0.480%"
			: statusLvl === 5
			? "lvl5 > 0.240%"
			: statusLvl === 4
			? "lvl4 > 0.120%"
			: statusLvl === 3
			? "lvl3 > 0.060%"
			: statusLvl === 2
			? "lvl2 > 0.030%"
			: statusLvl === 1
			? "lvl1 > 0.010%"
			: "lvl0";
	};

	const status = getStatus();

	//  select elemnt with id "stats" and apend a class dependinmg on the status
	const stats = document.getElementById("stats");
	if (stats) {
		stats.classList.add(`alert${statusLvl}`);
	}

	// stats.className = status() === "0" ? styles.stats : styles.statsWarn;

	// satus ? status.classList.add(satus()) : null;

	return (
		<div className={styles.data}>
			<div className={styles.status}>
				<p>status</p>
				<h3>{status}</h3>
			</div>
			<div>
				<div className={styles.title}>
					<p>Reproduction rate</p>
					<h3>{lastReproductionRate}</h3>
				</div>
			</div>
			<div className={styles.new}>
				<div>
					<p>New Cases</p>
					<h3>{newCases ? d3.format(",.0f")(newCases) : null}</h3>
				</div>
				<div>
					<p>New Deaths</p>
					<h3>{newDeaths ? d3.format(",.0f")(newDeaths) : null}</h3>
				</div>
			</div>
			<div>
				<p>{`last data update: ${date}`}</p>
				{/* <p>{`last server update: ${serverDate} UTC`}</p> */}
			</div>
		</div>
	);
};
