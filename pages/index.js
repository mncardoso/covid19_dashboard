import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetData } from "../components/components/GetData";
import { IsoMenu } from "../components/interface/isoMenu";
import { CovidStats } from "../components/graphql/CovidStats";
import { Vaccinations } from "../components/graphql/Vaccinations";
import { LineChart } from "../components/graphql/LineChart";

let Home = () => {
	let router = useRouter();
	let data = GetData();
	let [isoCode, setIsoCode] = useState("WRL");
	router.query.isoCode = router.query.isoCode
		? (router.query.isoCode, setIsoCode(router.query.isoCode))
		: isoCode;
	let menu = data ? (
		<IsoMenu
			options={Object.keys(data)}
			id="location-select"
			selectedValue={isoCode}
			onSelectedValueChange={setIsoCode}
			data={data}
		/>
	) : (
		<></>
	);

	return data ? (
		<div>
			<Head>
				<title>Covid Dashboard | {data[isoCode]["location"]}</title>
			</Head>
			<main className="charts">
				<div className="title">
					<h1>{data[isoCode]["location"]}</h1>
					<div>{menu}</div>
				</div>
				<div className="cases section">
					<h2>Covid Cases</h2>
					<div className="content" id="new_cases">
						<LineChart
							data={data}
							isoCode={isoCode}
							id="new_cases"
							dateFromat="%m/%y"
							termMain="new_cases_smoothed"
							termSub="new_cases"
							death={false}
							t14={false}
						/>
					</div>
				</div>
				<div className="lastdays section">
					<h2>Last 14 days</h2>
					<div className="content" id="last_days">
						<LineChart
							data={data}
							isoCode={isoCode}
							id="last_days"
							dateFromat="%d"
							termMain="new_cases_smoothed"
							termSub="new_cases"
							death={false}
							t14={true}
						/>
					</div>
				</div>
				<div className="vaccinations section">
					<h2>Vaccinations</h2>
					<div className="content">
						<Vaccinations data={data} isoCode={isoCode} />
					</div>
				</div>
				<div className="deaths section">
					<h2>Covid Deaths</h2>
					<div className="content" id="new_deaths">
						<LineChart
							data={data}
							isoCode={isoCode}
							id="new_deaths"
							dateFromat="%m/%y"
							termMain="new_deaths_smoothed"
							termSub="new_deaths"
							death={true}
							t14={false}
						/>
					</div>
				</div>
				<div className="stats section">
					<h2>Covid Stats</h2>
					<div className="content">
						<CovidStats data={data} isoCode={isoCode} />
					</div>
				</div>
			</main>
		</div>
	) : (
		<div>
			<Head>
				<title>Covid Dashboard | Data</title>
			</Head>
			<main className="charts">
				<div className="title">
					<h1>Loading data from &quot;Our World in Data&quot;</h1>
				</div>
				<div className="cases section">
					<h2>Covid Cases</h2>
					<div className="content" id="new_cases">
						<h2>
							Please be patient there is a lot of data being gathered, and there
							will be a graph here when the data arrives
						</h2>
					</div>
				</div>
				<div className="lastdays section">
					<h2>Last 14 days</h2>
					<div className="content" id="last_days">
						<h2>This graph will be small</h2>
					</div>
				</div>
				<div className="vaccinations section">
					<h2>Vaccinations</h2>
					<div className="content">
						<h2>If people are vaccinated you won&apos;t see too much red</h2>
					</div>
				</div>
				<div className="deaths section">
					<h2>Covid Deaths</h2>
					<div className="content" id="new_deaths">
						<h2>This is the grim graph</h2>
					</div>
				</div>
				<div className="stats section">
					<h2>Covid Stats</h2>
					<div className="content">
						<h2>Just some data to keep you informed</h2>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
