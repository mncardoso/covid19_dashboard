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
import { createUseStyles } from "react-jss";

let parseDate = timeParse("%Y-%m-%d");

let xValue = (d) => d.date;
let yValue = (d) => d.cases;

// css builder
const useStyles = createUseStyles((theme) => ({
	Data: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	Title: {
		display: "flex",
		justifyContent: "space-between",
	},
	CasesSub: {
		fill: "none",
		stroke: theme.effect.primary,
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	CasesMain: {
		fill: "none",
		stroke: theme.palette.primary,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	CasesSubRed: {
		fill: "none",
		stroke: theme.effect.secundary,
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	CasesMainRed: {
		fill: "none",
		stroke: theme.palette.secundary,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	Axis: {
		"& line": {
			stroke: "rgba(255, 255, 255, 0.1)",
			strokeLinecap: "round",
			strokeLinejoin: "round",
		},

		"& path": {
			stroke: "none",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
		},
		"& text": {
			fill: theme.palette.text,
			fontFamily: "'Montserrat', sans-serif",
			fontSize: "0.75rem",
			fontWeight: theme.fontWeight.Medium,
			textDecoration: "none",
			margin: "none",
			textAnchor: "left",
		},
	},
}));

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
	props,
}) => {
	let classes = useStyles(props);

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
				<g className={classes.Axis}>
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
				<path className={classes.CasesSubRed} d={lineGenerator(dateDataSub)} />
				<path
					className={classes.CasesMainRed}
					d={lineGenerator(dateDataMain)}
				/>
			</g>
		</svg>
	) : (
		<svg width={width} height={height}>
			<g>
				<g className={classes.Axis}>
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
				<path className={classes.CasesSub} d={lineGenerator(dateDataSub)} />
				<path className={classes.CasesMain} d={lineGenerator(dateDataMain)} />
			</g>
		</svg>
	);
};
