import { BarChart } from "@/components/graphs/BarChart";
import { CovidStats } from "@/components/graphs/CovidStats";
import { Vaccinations } from "@/components/graphs/Vaccinations";
import { MenuBar } from "@/layout/MenuBar";
import Head from "next/head";

const Iso = () =>
	// 	props: {
	// 	location: string;
	// 	population: number;
	// 	data: {
	// 		new_cases: number;
	// 		new_deaths: number;
	// 		date: string;
	// 		new_cases_smoothed: number;
	// 		new_deaths_smoothed: number;
	// 		reproduction_rate: number;
	// 		people_vaccinated: number;
	// 		people_fully_vaccinated: number;
	// 		total_boosters: number;
	// 	}[];
	// 	menuData: unknown;
	// }
	{
		return (
			<div>
				<p>API</p>
				{/* <Head>
				<title>{`Covid Dashboard | ${props.location}`}</title>
			</Head>
			<MenuBar data={props.menuData} />
			<main className="charts">
				<div className="title">
					<h1>{`${props.location}`}</h1>
				</div>
				<div className="cases section">
					<h3>Covid Cases</h3>
					<div className="content" id="new_cases">
						<BarChart
							data={props.data}
							population={props.population}
							id="new_cases"
							dateFromat="%m/%y"
							term="new_cases"
							death={false}
							t14={false}
						/>
					</div>
				</div>
				<div className="stats section" id="stats">
					<h3>Covid Stats</h3>
					<div className="content">
						<CovidStats
							data={props.data.reverse()}
							population={props.population}
						/>
					</div>
				</div>
				<div className="lastdays section">
					<h3>Last 14 days</h3>
					<div className="content" id="last_days">
						<BarChart
							data={props.data}
							population={props.population}
							id="last_days"
							dateFromat="%d"
							term="new_cases"
							death={false}
							t14={true}
						/>
					</div>
				</div>
				<div className="deaths section">
					<h3>Covid Deaths</h3>
					<div className="content" id="new_deaths">
						<BarChart
							data={props.data}
							population={props.population}
							id="new_deaths"
							dateFromat="%m/%y"
							term="new_deaths"
							death={true}
							t14={false}
						/>
					</div>
				</div>
				<div className="vaccinations section">
					<h3>Vaccinations</h3>
					<div className="content">
						<Vaccinations data={props.data} population={props.population} />
					</div>
				</div>
			</main> */}
			</div>
		);
	};

export default Iso;

// export async function getStaticPaths() {
// 	const response = await fetch("https://covid-dashboard.app/api");
// 	const data = await response.json();
// 	const paths = Object.keys(data).map((iso: string) => ({
// 		params: { iso: iso },
// 	}));
// 	return { paths, fallback: "blocking" };
// }

// export async function getStaticProps({ params }: { params: { iso: string } }) {
// 	const response = await fetch("https://covid-dashboard.app/api");
// 	const menuData = await response.json();
// 	const location = menuData[params.iso]?.location;
// 	const population = menuData[params.iso]?.population;
// 	const responseISO = await fetch(
// 		`https://covid-dashboard.app/api/${params.iso}`
// 	);
// 	const data = await responseISO.json();
// 	return { props: { location, population, data, menuData }, revalidate: 3600 };
// }
