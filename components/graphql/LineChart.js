import * as d3 from "d3";
import styles from "../../styles/graphql/LineChart.module.css";

let parseDate = d3.timeParse("%Y-%m-%d");

let xValue = (d) => d.date;
let yValue = (d) => d.cases;

export let LineChart = ({
	data, // data for graph
	isoCode, // country iso code
	dateFromat, // date format
	id, // id of div to render graph
	termMain, // term for the main line
	termSub, // term for the sub line
	death = false, // if death is true, the will be red
	t14 = false, // if true, will show the last 14 days of data
}) => {
	let margin = { top: 0, bottom: 20, left: 40, right: -30 };
	let divID = document.getElementById(id);

	let chartClass = death ? styles.cases_main_red : styles.cases_main;
	let chartClassSub = death ? styles.cases_sub_red : styles.cases_sub;
	let t = !t14 ? 0 : -14;
	let isoData = data[isoCode]["data"].slice(t);
	let dataSub = isoData.map((d) => (!d[termSub] ? 0 : +d[termSub]));
	let dataMain = isoData.map((d) => (!d[termMain] ? 0 : +d[termMain]));
	let value = {
		min: d3.min(dataSub) - d3.min(dataSub) * 0.01,
		max: d3.max(dataSub) + d3.max(dataSub) * 0.01,
	};
	let date = isoData.map((d) => parseDate(d["date"])).slice(t);
	let day = { min: d3.min(date), max: d3.max(date) };
	let dateDataSub = isoData.map(function (d, i) {
		return { date: date[i], cases: dataSub[i] };
	});
	let dateDataMain = isoData.map(function (d, i) {
		return { date: date[i], cases: dataMain[i] };
	});

	console.log(data[isoCode]["population"]);

	let draw = () => {
		if (d3.select(divID).selectAll("svg").size() > 0) {
			d3.select(divID).selectAll("svg").remove();
		}
		let svg = d3.select(divID).append("svg");
		let width = divID.clientWidth;
		let height = divID.clientHeight;
		let size = {
			width: width - (margin.left + margin.right),
			height: height - (margin.top + margin.bottom),
		};
		let tick =
			dateFromat === "%d" ? d3.timeDay.every(1) : d3.timeMonth.every(1);
		let tickFormat =
			dateFromat === "%d"
				? d3.timeFormat("%d")
				: (d) => (d <= d3.timeYear(d) ? d.getFullYear() : null);

		let xScale = d3
			.scaleTime()
			.domain([day.min, day.max])
			.range([margin.left, size.width]);

		let yScale = d3
			.scaleLinear()
			.domain([value.min, value.max])
			.range([size.height, margin.bottom]);

		let lineGenerator = d3
			.line()
			.x((d) => xScale(xValue(d)))
			.y((d) => yScale(yValue(d)));

		let xAxis = d3
			.axisBottom(xScale)
			.tickSizeInner(5)
			.tickPadding(5)
			.ticks(tick)
			.tickFormat(tickFormat)
			.tickSizeOuter(0);
		let yAxis = d3
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
	return draw(), window.addEventListener("resize", draw);
};
