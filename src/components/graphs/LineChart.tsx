// @ts-nocheck
import styles from "@/components/graphs/styles/LineChart.module.css";
import { LINE_Function } from "@/types/types";
import * as d3 from "d3";

const parseDate = d3.timeParse("%Y-%m-%d");

const xValue = (d: any) => d.date;
const yValue = (d: any) => d.cases;

export const LineChart: LINE_Function = ({
	data, // data for graph
	population,
	dateFromat, // date format
	id, // id of div to render graph
	termMain, // term for the main line
	termSub, // term for the sub line
	death = false, // if death is true, the will be red
	t14 = false, // if true, will show the last 14 days of data
}) => {
	const margin = { top: 0, bottom: 20, left: 40, right: -30 };

	const chartClass = death ? styles.cases_main_red : styles.cases_main;
	const chartClassSub = death ? styles.cases_sub_red : styles.cases_sub;
	const t = !t14 ? 0 : -14;
	const isoData = data.slice(t);
	const dataSub = isoData.map((d) => (!d[termSub] ? 0 : +d[termSub]));
	const dataMain = isoData.map((d) => (!d[termMain] ? 0 : +d[termMain]));
	const value = {
		min: d3.min(dataSub) - d3.min(dataSub) * 0.01,
		max: d3.max(dataSub) + d3.max(dataSub) * 0.01,
	};
	const date = isoData.map((d) => parseDate(d.date)).slice(t);
	const day = { min: d3.min(date), max: d3.max(date) };
	const dateDataSub = isoData.map(function (d, i) {
		return { date: date[i], cases: dataSub[i] };
	});
	const dateDataMain = isoData.map(function (d, i) {
		return { date: date[i], cases: dataMain[i] };
	});

	let draw = () => {
		const divID = document?.getElementById(id);

		if (d3.select(divID).selectAll("svg").size() > 0) {
			d3.select(divID).selectAll("svg").remove();
		}
		const svg = d3.select(divID).append("svg");
		const width = divID?.clientWidth;
		const height = divID?.clientHeight;
		const size = {
			width: width ? width - (margin.left + margin.right) : 0,
			height: height ? height - (margin.top + margin.bottom) : 0,
		};
		const tick =
			dateFromat === "%d" ? d3.timeDay.every(1) : d3.timeMonth.every(1);
		const tickFormat =
			dateFromat === "%d"
				? d3.timeFormat("%d")
				: (d) => (d <= d3.timeYear(d) ? d.getFullYear() : null);

		const xScale = d3
			.scaleTime()
			.domain([day.min, day.max])
			.range([margin.left, size.width]);

		const yScale = d3
			.scaleLinear()
			.domain([value.min, value.max])
			.range([size.height, margin.bottom]);

		const lineGenerator = d3
			.line()
			.x((d) => xScale(xValue(d)))
			.y((d) => yScale(yValue(d)));

		const xAxis = d3
			.axisBottom(xScale)
			.tickSizeInner(5)
			.tickPadding(5)
			.ticks(tick)
			.tickFormat(tickFormat)
			.tickSizeOuter(0);
		const yAxis = d3
			.axisLeft(yScale)
			.tickSizeInner(-size.width + margin.left)
			.tickPadding(5)
			.ticks(12)
			.tickFormat((x) =>
				x > 999999 ? `${x / 1000000} M` : x > 999 ? `${x / 1000} K` : x
			);

		svg
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "none")
			.attr("strokeLinecap", "round")
			.attr("strokeLinejoin", "round");

		svg
			.append("g")
			.attr("transform", `translate(0, ${size.height})`)
			.call(xAxis)
			.call((g) =>
				g
					.append("text")
					.attr("dx", "0px")
					.attr("dy", "10px")
					.attr("transform", "rotate(0)")
					.attr("vector-effect", "non-scaling-size")
			)
			.call((g) =>
				g
					.selectAll("line")
					.attr("stroke-width", "1")
					.attr("stroke", "#fff")
					.attr("vector-effect", "non-scaling-size")
			)
			.call((g) => g.selectAll("path").remove());
		svg
			.append("g")
			.attr("transform", `translate(${margin.left},0)`)
			.call(yAxis)
			.call((g) =>
				g
					.append("text")
					.attr("dx", "-3px")
					.attr("dy", "3px")
					.attr("transform", "rotate(0)")
					.attr("vector-effect", "non-scaling-size")
			)
			.call((g) =>
				g
					.selectAll("line")
					.attr("stroke-width", "1")
					.attr("stroke", "hsla(0, 0%, 100%, 0.1)")
					.attr("vector-effect", "non-scaling-stroke")
			)
			.call((g) => g.selectAll("path").remove());

		svg
			.append("path")
			.attr("class", chartClassSub)
			.attr("d", lineGenerator(dateDataSub));
		svg
			.append("path")
			.attr("class", chartClass)
			.attr("d", lineGenerator(dateDataMain));
	};

	if (typeof window !== "undefined") {
		return draw(), window.addEventListener("resize", draw);
	}
};
