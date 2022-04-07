import { createUseStyles } from "react-jss";

// css builder
const useStyles = createUseStyles((theme) => ({
	Charts: {
		display: "grid",
		height: "100vh",
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
		flexDirection: "column",
		height: "100%",
		width: "100%",
		borderRadius: "8px",
		justifyContent: "center",

		"& h1": {
			alignSelf: "center",
			textAlign: "center",
		},
	},
}));

export let Loading = ({ props }) => {
	const classes = useStyles(props);

	return (
		<div className={classes.Charts}>
			<div className={classes.Title}>
				<h1>Loading data from "Our World in Data"</h1>
			</div>
			<div id="CasesChart" className={classes.Section}>
				<h2>Covid Cases</h2>
				<div className={classes.Temp}>
					<h2>
						Please be patient there is a lot of data being gathered, and there
						will be a graph here when the data arrives
					</h2>
				</div>
			</div>
			<div id="LastDays" className={classes.Section}>
				<h2>Last 14 days</h2>
				<div className={classes.Temp}>
					<h2>This graph will be small</h2>
				</div>
			</div>
			<div id="Vaccinations" className={classes.Section}>
				<h2>Vaccinations</h2>
				<div id="DivVaccinations" className={classes.Temp}>
					<h2>If people are vaccinated you won't see too much red</h2>
				</div>
			</div>
			<div id="DeathsChart" className={classes.Section}>
				<h2>Covid Deaths</h2>
				<div className={classes.Temp}>
					<h2>This is the grim graph</h2>
				</div>
			</div>
			<div id="CovidStats" className={classes.Section}>
				<h2>Covid Stats</h2>
				<div className={classes.Temp}>
					<h2>Just some data to keep you informed</h2>
				</div>
			</div>
		</div>
	);
};
