import { max, scaleLinear } from "d3";
import { createUseStyles } from "react-jss";

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
	RedBG: { fill: theme.effect.secundary },
	RedFG: { fill: theme.palette.secundary },
	BlueBG: { fill: theme.effect.primary },
	BlueFG: { fill: theme.palette.primary },
}));

export let Vaccinations = ({ data, width, isoCode, props }) => {
	const classes = useStyles(props);
	let isoData = data[isoCode]["data"];
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

	let percentage = scaleLinear().domain([0, population]).range([0, 100]);

	let vaccinationNum = {
		zero: population - max(dataVax1),
		one: max(dataVax1) - max(dataVax2),
		two: max(dataVax2) - max(dataVax3),
		three: max(dataVax3),
	};

	let vaccinationWidth = {
		zero: parseFloat(width) * (percentage(vaccinationNum.zero) / 100),
		one: parseFloat(width) * (percentage(vaccinationNum.one) / 100),
		two: parseFloat(width) * (percentage(vaccinationNum.two) / 100),
		three: parseFloat(width) * (percentage(vaccinationNum.three) / 100),
	};

	let barHeight = 16;

	return (
		<div className={classes.Data}>
			<div>
				<div className={classes.Title}>
					<p>0 Vaccines</p>
					<p>{percentage(vaccinationNum.zero).toFixed(2)}%</p>
				</div>
				<svg width={width} height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={width}
						height={barHeight}
						className={classes.RedBG}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={vaccinationWidth.zero}
						height={barHeight}
						className={classes.RedFG}
					/>
				</svg>
			</div>
			<div>
				<div className={classes.Title}>
					<p>1 Vaccine</p>
					<p>{percentage(vaccinationNum.one).toFixed(2)}%</p>
				</div>
				<svg width={width} height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={width}
						height={barHeight}
						className={classes.BlueBG}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={vaccinationWidth.one}
						height={barHeight}
						className={classes.BlueFG}
					/>
				</svg>
			</div>
			<div>
				<div className={classes.Title}>
					<p>2 Vaccines</p>
					<p>{percentage(vaccinationNum.two).toFixed(2)}%</p>
				</div>
				<svg width={width} height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={width}
						height={barHeight}
						className={classes.BlueBG}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={vaccinationWidth.two}
						height={barHeight}
						className={classes.BlueFG}
					/>
				</svg>
			</div>
			<div>
				<div className={classes.Title}>
					<p>3 Vaccines</p>
					<p>{percentage(vaccinationNum.three).toFixed(2)}%</p>
				</div>
				<svg width={width} height={barHeight}>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={width}
						height={barHeight}
						className={classes.BlueBG}
					/>
					<rect
						x="0"
						y="0"
						rx="8px"
						ry="8px"
						width={vaccinationWidth.three}
						height={barHeight}
						className={classes.BlueFG}
					/>
				</svg>
			</div>
		</div>
	);
};
