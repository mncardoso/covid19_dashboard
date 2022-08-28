// @ts-nocheck
import styles from "@/components/graphs/styles/BarChart.module.css";
import { LINE_Function } from "@/types/types";
import * as d3 from "d3";

const parseDate = d3.timeParse("%Y-%m-%d");

const xValue = (d: any) => d.date;
const yValue = (d: any) => d.cases;

export const BarChart: LINE_Function = ({
	data, // data for graph
	population,
	dateFromat, // date format
	id, // id of div to render graph
	term, // term for the main line
	death = false, // if death is true, the will be red
	t14 = false, // if true, will show the last 14 days of data
}) => {
	// > setings
	const margin = { top: 2, bottom: 12, left: 45, right: -15 };
	const chartClass = death ? styles.cases_red : styles.cases;
	const t = !t14 ? 0 : -14;

	// > compute data
	const dataReverse = data.reverse();
	let dataAverage: { date: any; new_cases: number; new_deaths: number }[] = [];
	let days,
		cases,
		deaths = 0;
	dataReverse.map((d) => {
		if (days <= 7) {
			cases += d.new_cases;
			deaths += d.new_deaths;
			days += 1;
		} else {
			days = 0;
			dataAverage.push({
				date: d.date,
				new_cases: cases / 7,
				new_deaths: deaths / 7,
			});
			cases = 0;
			deaths = 0;
		}
	});
	// dataAverage.reverse();
	const isoData = !t14 ? dataAverage : data.slice(t);

	// Compute values
	const xValues = isoData.map((d) => (!d.date ? 0 : +parseDate(d.date)));
	const yValues = isoData.map((d) => (!d[term] ? 0 : +d[term]));
	const values = isoData.map((d) => ({
		date: !d.date ? 0 : +parseDate(d.date),
		cases: !d[term] ? 0 : +d[term],
	}));

	const I = d3.range(xValues.length).filter((d) => xValues[d] !== 0);

	const xMinMax = { min: d3.min(xValues), max: d3.max(xValues) };
	const yMinMax = {
		min: d3.min(yValues) - d3.min(yValues) * 0.01,
		max: d3.max(yValues) + d3.max(yValues) * 0.01,
	};
	const xDomain = [xMinMax.min, xMinMax.max];
	const yDomain = [0, yMinMax.max];

	// Compute bins.
	const bins = d3
		.bin()
		.thresholds(xValues.length)
		.value((i) => xValues[i])(I);

	// console.log(t14 ? xValues : "no");

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
		// Construct scales and axes.
		const xRange = [margin.left + 16, size.width - margin.right - 16];
		const yRange = [size.height - margin.bottom, margin.top];
		const xScale = d3.scaleTime().domain(xDomain).range(xRange);
		const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

		const tick =
			dateFromat === "%d" ? d3.timeDay.every(1) : d3.timeMonth.every(1);
		const tickFormat =
			dateFromat === "%d"
				? d3.timeFormat("%d")
				: (d) => (d <= d3.timeYear(d) ? d.getFullYear() : null);

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
			.attr("transform", `translate(0, ${size.height - 10})`)
			.call(xAxis)
			.call((g) =>
				g
					.append("text")
					.attr("dx", "0px")
					.attr("dy", "10px")
					.attr("transform", "rotate()")
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
			.append("g")
			.attr("class", chartClass)
			.selectAll("rect")
			.data(values)
			.enter()
			.append("rect")
			.attr(
				"x",
				(d) =>
					xScale(d.date) -
					(xRange[1] / xValues.length - (xRange[1] / xValues.length) * 0.3) / 2
			)
			.attr(
				"width",
				xRange[1] / xValues.length - (xRange[1] / xValues.length) * 0.3
			)
			.attr("y", (d) => yScale(d.cases))
			.attr("height", (d) => yScale(0) - yScale(d.cases))
			.attr("rx", "4px")
			.attr("ry", "4px");
	};

	if (typeof window !== "undefined") {
		return draw(), window.addEventListener("resize", draw);
	}
};
