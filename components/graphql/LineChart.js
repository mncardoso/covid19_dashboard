import {
	min,
	max,
	scaleLinear,
	scaleTime,
	timeParse,
	timeFormat,
	axisBottom,
	axisLeft,
	line,
	select,
} from "d3";
import { useEffect, useRef } from "react";
import styles from "../../styles/graphql/LineChart.module.css";

let parseDate = timeParse("%Y-%m-%d");

let xValue = (d) => d.date;
let yValue = (d) => d.cases;

export let LineChart = ({
	data,
	isoCode,
	width,
	height,
	dateFromat,
	termMain,
	termSub,
	death = false,
	t14 = false,
}) => {
	let t = !t14 ? 0 : -14;

	let margin = { top: 0, bottom: 20, left: 43, right: -30 };

	let size = {
		width: width - (margin.left + margin.right),
		height: height - (margin.top + margin.bottom),
	};

	let isoData = data[isoCode]["data"].slice(t);

	let dataSub = isoData.map((d) => (!d[termSub] ? 0 : +d[termSub]));
	let dataMain = isoData.map((d) => (!d[termMain] ? 0 : +d[termMain]));

	let value = {
		min: min(dataSub) - min(dataSub) * 0.01,
		max: max(dataSub) + max(dataSub) * 0.01,
	};

	let date = isoData.map((d) => parseDate(d["date"])).slice(t);
	let day = { min: min(date), max: max(date) };

	let dateDataSub = isoData.map(function (d, i) {
		return { date: date[i], cases: dataSub[i] };
	});

	let dateDataMain = isoData.map(function (d, i) {
		return { date: date[i], cases: dataMain[i] };
	});

	let xScale = scaleTime()
		.domain([day.min, day.max])
		.range([margin.left, size.width]);

	let yScale = scaleLinear()
		.domain([value.min, value.max])
		.range([size.height, margin.bottom]);

	let lineGenerator = line()
		.x((d) => xScale(xValue(d)))
		.y((d) => yScale(yValue(d)));

	let XAxis = ({ xScale, axisWidth, axisHeight, dateFromat }) => {
		let ref = useRef();
		let tick = dateFromat === "%d" ? 14 : axisWidth / 60;
		useEffect(() => {
			let xAxisG = select(ref.current);
			let xAxis = axisBottom(xScale)
				.tickSizeInner(0)
				.tickPadding(10)
				.ticks(tick)
				.tickFormat(timeFormat(dateFromat));
			xAxisG
				.call(xAxis)
				.selectAll("text")
				.attr("dx", "0px")
				.attr("dy", "10px")
				.attr("transform", "rotate(0)");
		}, []);
		return <g transform={`translate(0,${axisHeight})`} ref={ref}></g>;
	};

	let YAxis = ({ yScale, axisWidth, axisHeight, margin }) => {
		let ref = useRef();
		useEffect(() => {
			let yAxisG = select(ref.current);
			let yAxis = axisLeft(yScale)
				.tickSizeInner(-axisWidth + margin.left)
				.tickPadding(5)
				.ticks(axisHeight / 25)
				.tickFormat((x) =>
					x > 999999 ? `${x / 1000000} M` : x > 999 ? `${x / 1000} K` : x
				);
			yAxisG
				.call(yAxis)
				.selectAll("text")
				.attr("dx", "-3px")
				.attr("dy", "3px")
				.attr("transform", "rotate(0)");
		}, []);
		return <g transform={`translate(${margin.left},0)`} ref={ref}></g>;
	};

	return death ? (
		<svg width={width} height={height}>
			<g>
				<g className={styles.axis}>
					<XAxis
						xScale={xScale}
						axisWidth={size.width}
						axisHeight={size.height}
						dateFromat={dateFromat}
					/>
					<YAxis
						yScale={yScale}
						axisWidth={size.width}
						axisHeight={size.height}
						margin={margin}
					/>
				</g>
				<path className={styles.cases_sub_red} d={lineGenerator(dateDataSub)} />
				<path
					className={styles.cases_main_red}
					d={lineGenerator(dateDataMain)}
				/>
			</g>
		</svg>
	) : (
		<svg width={width} height={height}>
			<g>
				<g className={styles.axis}>
					<XAxis
						xScale={xScale}
						axisWidth={size.width}
						axisHeight={size.height}
						dateFromat={dateFromat}
					/>
					<YAxis
						yScale={yScale}
						axisWidth={size.width}
						axisHeight={size.height}
						margin={margin}
					/>
				</g>
				<path className={styles.cases_sub} d={lineGenerator(dateDataSub)} />
				<path className={styles.cases_main} d={lineGenerator(dateDataMain)} />
			</g>
		</svg>
	);
};
