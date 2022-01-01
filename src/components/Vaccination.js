import { arc, min, max, scaleLinear } from "d3";

export let Vaccination = ({ data, width, height, isoCode }) => {
	let isoData = data[isoCode]["data"];

	let margin = 60;
	let sml = min([width, height]);
	let radius = sml / 3;

	let population = data[isoCode]["population"];

	let dataVax1 = isoData.map((d) =>
		!d["people_vaccinated"] ? 0 : d["people_vaccinated"]
	);
	let dataVax2 = isoData.map((d) =>
		!d["people_fully_vaccinated"] ? 0 : d["people_fully_vaccinated"]
	);
	let dataVax3 = isoData.map((d) =>
		!d["total_boosters"] ? 0 : d["total_boosters"]
	);
	let vax3 = max(dataVax3);
	let vax2 = max(dataVax2) - max(dataVax3);
	let vax1 = max(dataVax1) - max(dataVax2);
	let vax0 = population - max(dataVax1);

	let percentage = scaleLinear().domain([0, population]).range([0, 100]);
	let arcAngle = scaleLinear().domain([0, population]).range([0, 2]);

	let angVax0 = arcAngle(vax0);
	let angVax1 = angVax0 + arcAngle(vax1);
	let angVax2 = angVax1 + arcAngle(vax2);
	let angVax3 = angVax2 + arcAngle(vax3);

	let piData = [
		{ name: "0 vax", numb: vax0 },
		{ name: "1 vax", numb: vax1 },
		{ name: "2 vax", numb: vax2 },
		{ name: "3 vax", numb: vax3 },
	];

	let arcVax0 = arc()
		.innerRadius(radius * 0.5)
		.outerRadius(radius)
		.startAngle(Math.PI * 0)
		.endAngle(Math.PI * angVax0);
	let arcVax1 = arc()
		.innerRadius(radius * 0.5)
		.outerRadius(radius)
		.startAngle(Math.PI * angVax0)
		.endAngle(Math.PI * angVax1);
	let arcVax2 = arc()
		.innerRadius(radius * 0.5)
		.outerRadius(radius)
		.startAngle(Math.PI * angVax1)
		.endAngle(Math.PI * angVax2);
	let arcVax3 = arc()
		.innerRadius(radius * 0.5)
		.outerRadius(radius)
		.startAngle(Math.PI * angVax2)
		.endAngle(Math.PI * angVax3);

	let arcFull = arc()
		.innerRadius(radius * 0.5)
		.outerRadius(radius)
		.startAngle(Math.PI * 0)
		.endAngle(Math.PI * 2);

	return (
		<div>
			<svg width={width} height={height}>
				<path
					className="arcGlow"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcFull()}
				/>
				<path
					className="arc"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcFull()}
				/>
				<path
					className="vax0"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcVax0()}
				/>
				<path
					className="vax1"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcVax1()}
				/>
				<path
					className="vax2"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcVax2()}
				/>
				<path
					className="vax3"
					transform={`translate(${width / 2},${height / 2})`}
					d={arcVax3()}
				/>
			</svg>
			<div className="arcLegend">
				<div>
					<p>0: {percentage(vax0).toFixed(2)}%</p>
					<p>({vax0})</p>
				</div>
				<div>
					<p>1: {percentage(vax1).toFixed(2)}%</p>
					<p>({vax1})</p>
				</div>
				<div>
					<p>2: {percentage(vax2).toFixed(2)}%</p>
					<p>({vax2})</p>
				</div>
				<div>
					<p>3: {percentage(vax3).toFixed(2)}%</p>
					<p>({vax3})</p>
				</div>
			</div>
		</div>
	);
};
