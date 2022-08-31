import styles from "@/components/graphs/styles/CovidStats.module.css";
import { DATA_Function } from "@/types/types";
import * as d3 from "d3";

const parseTime = d3.timeParse("%Y-%m-%d");
const formatTime = d3.timeFormat("%d/%m/%y");

export const CovidStats: DATA_Function = ({ data, population }) => {
	const day = data.map((d) => d.date).slice(-1)[0];
	const dayParse = day ? parseTime(day) : null;
	const date = dayParse ? formatTime(dayParse) : null;
	console.log(date);
	const newCases = data.slice(-1)[0]?.new_cases;
	const newDeaths = data.slice(-1)[0]?.new_deaths;

	const reproductionRate = data.map((d) =>
		!d.reproduction_rate ? 0 : +d.reproduction_rate
	);
	const lastReproductionRate = reproductionRate.reverse().find((rt) => rt > 0);

	const getPerDay = () => {
		const last7Days = data.map((d) => d.new_cases).slice(-7);
		const statusScale = d3
			.scaleLinear()
			.range([0, 10000])
			.domain([0, population]);
		return Math.floor(statusScale(d3.sum(last7Days)));
	};

	const perDay = getPerDay();

	const getStatus = () => {
		return perDay >= 48 ? (
			<h3>
				<span className={styles.alert6}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : perDay >= 24 ? (
			<h3>
				<span className={styles.alert5}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : perDay >= 12 ? (
			<h3>
				<span className={styles.alert4}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : perDay >= 6 ? (
			<h3>
				<span className={styles.alert3}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : perDay >= 3 ? (
			<h3>
				<span className={styles.alert2}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : perDay >= 1 ? (
			<h3>
				<span className={styles.alert1}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		) : (
			<h3>
				<span className={styles.alert0}>{perDay}</span>
				{" in 10 000 peeple per day"}
			</h3>
		);
	};

	return (
		<div className={styles.data}>
			<div className={styles.status}>
				<p>status</p>
				{getStatus()}
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
					<h3>{newCases}</h3>
				</div>
				<div>
					<p>New Deaths</p>
					<h3>{newDeaths}</h3>
				</div>
			</div>
			<div>
				<h6>{`last data update: ${date}`}</h6>
			</div>
		</div>
	);
};
