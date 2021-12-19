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

let parseDate = timeParse("%Y-%m-%d");

let xValue = (d) => d.date;
let yValue = (d) => d.new_cases_smoothed;

export let LastDays = ({ data, isoCode, width, height }) => {
	let margin = { top: 0, right: 1, bottom: 30, left: 20 };

	let innerWidth = width - (margin.left + margin.right);
	let innerHeight = height - (margin.top + margin.bottom);

	let isoData = data[isoCode]["data"];
	let population = data[isoCode]["population"];

	let newCases = isoData
		.map((d) => (!d["new_cases_smoothed"] ? 0 : +d["new_cases_smoothed"]))
		.slice(-14);
	let minVal = min(newCases) - min(newCases) * 0.01;
	let maxVal = max(newCases) + max(newCases) * 0.01;

	let day = isoData.map((d) => d["date"]).slice(-14);
	let minDay = min(day);
	let maxDay = max(day);

	let casesWithDate = isoData.map(function (d, i) {
		return {
			date: day[i],
			new_cases_smoothed: newCases[i],
		};
	});

	let xScale = scaleTime()
		.domain([minDay, maxDay])
		.range([margin.left, innerWidth]);

	let yScale = scaleLinear()
		.domain([minVal, maxVal])
		.range([innerHeight, margin.bottom]);

	let lineGenerator = line()
		.x((d) => xScale(xValue(d)))
		.y((d) => yScale(yValue(d)));

	let dangerScale = scaleLinear().domain([0, 100000]).range([0, population]);
	let danger250 = Math.floor(dangerScale(250 / 14));
	let danger500 = Math.floor(dangerScale(500 / 14));
	let marker250 = Math.floor(yScale(danger250));
	let marker500 = Math.floor(yScale(danger500));

	let XAxis = ({ xScale, innerWidth, innerHeight, margin }) => {
		let ref = useRef();
		useEffect(() => {
			let xAxisG = select(ref.current);
			let xAxis = axisBottom(xScale)
				.tickSizeInner(-innerHeight + margin.bottom)
				.tickPadding(5)
				.ticks(innerWidth / 70)
				.tickFormat(timeFormat("%d/%m/%y"));
			xAxisG
				.call(xAxis)
				.selectAll("text")
				.style("text-anchor", "middle")
				.attr("dx", "-20px")
				.attr("dy", "7px")
				.attr("transform", "rotate(-25)");
		}, []);
		return <g transform={`translate(0,${innerHeight})`} ref={ref}></g>;
	};

	let YAxis = ({ xScale, innerWidth, innerHeight, margin }) => {
		let ref = useRef();
		useEffect(() => {
			let yAxisG = select(ref.current);
			let yAxis = axisLeft(yScale)
				.tickSizeInner(-innerWidth + margin.left)
				.tickPadding(5)
				.ticks(innerHeight / 25);
			yAxisG
				.call(yAxis)
				.selectAll("text")
				.style("text-anchor", "middle")
				.attr("dx", "-.5rem")
				.attr("dy", ".30rem")
				.attr("transform", "rotate(0)");
		}, []);
		return <g transform={`translate(${margin.left},0)`} ref={ref}></g>;
	};

	return (
		<>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<g className="axis">
						<XAxis
							xScale={xScale}
							innerWidth={innerWidth}
							innerHeight={innerHeight}
							margin={margin}
						/>
						<YAxis
							yScale={yScale}
							innerWidth={innerWidth}
							innerHeight={innerHeight}
							margin={margin}
						/>
					</g>
					<path className="graphGlow" d={lineGenerator(casesWithDate)} />
					<path className="graph" d={lineGenerator(casesWithDate)} />
					<g className="dangerLines">
						<text x={margin.left + 5} y={marker500 - 5}>
							500 mark ({danger500})
						</text>
						<line
							x1={margin.left}
							y1={marker500}
							x2={innerWidth}
							y2={marker500}
						/>
						<text x={margin.left + 5} y={marker250 - 5}>
							250 mark ({danger250})
						</text>
						<line
							x1={margin.left}
							y1={marker250}
							x2={innerWidth}
							y2={marker250}
						/>
					</g>
				</g>
			</svg>
		</>
	);
};
