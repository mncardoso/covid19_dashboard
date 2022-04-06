import { useState } from "react";
import { IsoMenu } from "./IsoMenu";
import { Vaccinations } from "./Vaccinations";
import { CovidStats } from "./CovidStats";
import { createUseStyles } from "react-jss";
import { LineChart } from "./LineChart";

// css builder
const useStyles = createUseStyles((theme) => ({
	Charts: {
		display: "grid",
		height: window.innerHeight,
		gridTemplateColumns: "1fr 1fr 1fr",
		gridTemplateRows: "79px 1fr 1fr 1fr",
		gap: "1rem",
		padding: "1.5rem 1.5rem 1.5rem 2rem",
		color: theme.palette.text,
		textAlign: "left",
		"& #CasesChart": {
			gridRow: "2 / span 2",
			gridColumn: "1 / span 2",
		},
		"& #LastDays": {
			gridRow: "2",
			gridColumn: "3",
		},
		"& #Vaccinations": {
			gridRow: "3",
			gridColumn: "3",
		},
		"& #DeathsChart": {
			gridRow: "4",
			gridColumn: "1 / span 2",
		},
		"& #CovidStats": {
			gridRow: "4",
			gridColumn: "3",
		},
	},
	Title: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		height: "100%",
		alignItems: "end",
		gridRow: "1",
		gridColumn: "1 / span 3",
		lineHeight: "0",
	},

	DeathsChart: {
		gridRow: "4",
		gridColumn: "1 / span 2",
	},
	CovidStats: {
		gridRow: "4",
		gridColumn: "3",
	},
	Section: {
		display: "grid",
		width: "100%",
		height: "100%",
		background: theme.palette.foreground,
		padding: "1rem",
		gridTemplateRows: "1rem 1fr",
		gap: "1rem",
		borderRadius: "8px",
	},
	Temp: {
		display: "flex",
		height: "100%",
		width: "100%",
		borderRadius: "8px",
	},
}));

let size = {
	big: {
		width: ((window.innerWidth - 184) / 3) * 2 - 32,
		height: ((window.innerHeight - 174) / 3) * 2 - 64,
	},
	small: {
		width: (window.innerWidth - 184) / 3 - 32,
		height: (window.innerHeight - 174) / 3 - 64,
	},
};

export let Home = ({ data, props }) => {
	const classes = useStyles(props);

	let [isoCode, setIsoCode] = useState("OWID_WRL");
	let menu = (
		<IsoMenu
			options={Object.keys(data)}
			id="location-select"
			selectedValue={isoCode}
			onSelectedValueChange={setIsoCode}
			data={data}
		/>
	);

	return (
		<div className={classes.Charts}>
			<div className={classes.Title}>
				<h1>{data[isoCode]["location"]}</h1>
				<div>{menu}</div>
			</div>
			<div id="CasesChart" className={classes.Section}>
				<h2>Covid Cases</h2>
				<div className={classes.Temp}>
					<LineChart
						data={data}
						isoCode={isoCode}
						width={size.big.width}
						height={size.big.height}
						dateFromat="%m/%y"
						termMain="new_cases_smoothed"
						termSub="new_cases"
						death={false}
						t14={false}
					/>
				</div>
			</div>
			<div id="LastDays" className={classes.Section}>
				<h2>Last 14 days</h2>
				<div className={classes.Temp}>
					<LineChart
						data={data}
						isoCode={isoCode}
						width={size.small.width}
						height={size.small.height}
						dateFromat="%d"
						termMain="new_cases_smoothed"
						termSub="new_cases"
						death={false}
						t14={true}
					/>
				</div>
			</div>
			<div id="Vaccinations" className={classes.Section}>
				<h2>Vaccinations</h2>
				<div id="DivVaccinations" className={classes.Temp}>
					<Vaccinations
						data={data}
						isoCode={isoCode}
						width={size.small.width}
					/>
				</div>
			</div>
			<div id="DeathsChart" className={classes.Section}>
				<h2>Covid Deaths</h2>
				<div className={classes.Temp}>
					<LineChart
						data={data}
						isoCode={isoCode}
						width={size.big.width}
						height={size.small.height}
						dateFromat="%m/%y"
						termMain="new_deaths_smoothed"
						termSub="new_deaths"
						death={true}
						t14={false}
					/>
				</div>
			</div>
			<div id="CovidStats" className={classes.Section}>
				<h2>Covid Stats</h2>
				<div className={classes.Temp}>
					<CovidStats data={data} isoCode={isoCode} />
				</div>
			</div>
		</div>
	);
};
