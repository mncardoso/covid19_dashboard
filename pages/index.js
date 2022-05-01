import Head from "next/head";
import { useState } from "react";
import { GetData } from "../components/components/GetData";
import { IsoMenu } from "../components/interface/IsoMenu";
import { CovidStats } from "../components/graphql/CovidStats";
import { Vaccinations } from "../components/graphql/Vaccinations";
import { LineChart } from "../components/graphql/LineChart";

let Home = () => {
	let data = GetData();
	let [isoCode, setIsoCode] = useState("OWID_WRL");
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
	let size = data
		? {
				big: {
					width: ((window.innerWidth - 184) / 3) * 2 - 32,
					height: ((window.innerHeight - 174) / 3) * 2 - 64,
				},
				small: {
					width: (window.innerWidth - 184) / 3 - 32,
					height: (window.innerHeight - 174) / 3 - 64,
				},
		  }
		: {
				big: {
					width: ((200 - 184) / 3) * 2 - 32,
					height: ((200 - 174) / 3) * 2 - 64,
				},
				small: {
					width: (200 - 184) / 3 - 32,
					height: (200 - 174) / 3 - 64,
				},
		  };
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
				<div className="cases">
					<div className="section">
						<h2>Covid Cases</h2>
						<div className="content">
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
				</div>
				<div className="lastdays">
					<div className="section">
						<h2>Last 14 days</h2>
						<div className="content">
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
				</div>
				<div className="vaccinations">
					<div className="section">
						<h2>Vaccinations</h2>
						<div className="content">
							<Vaccinations
								data={data}
								isoCode={isoCode}
								width={size.small.width}
							/>
						</div>
					</div>
				</div>
				<div className="deaths">
					<div className="section">
						<h2>Covid Deaths</h2>
						<div className="content">
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
				</div>
				<div className="stats">
					<div className="section">
						<h2>Covid Stats</h2>
						<div className="content">
							<CovidStats data={data} isoCode={isoCode} />
						</div>
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
				<div className="cases">
					<div className="section">
						<h2>Covid Cases</h2>
						<div className="temp">
							<h2>
								Please be patient there is a lot of data being gathered, and
								there will be a graph here when the data arrives
							</h2>
						</div>
					</div>
				</div>
				<div className="lastdays">
					<div className="section">
						<h2>Last 14 days</h2>
						<div className="temp">
							<h2>This graph will be small</h2>
						</div>
					</div>
				</div>
				<div className="vaccinations">
					<div className="section">
						<h2>Vaccinations</h2>
						<div className="temp">
							<h2>If people are vaccinated you won&apos;t see too much red</h2>
						</div>
					</div>
				</div>
				<div className="deaths">
					<div className="section">
						<h2>Covid Deaths</h2>
						<div className="temp">
							<h2>This is the grim graph</h2>
						</div>
					</div>
				</div>
				<div className="stats">
					<div className="section">
						<h2>Covid Stats</h2>
						<div className="temp">
							<h2>Just some data to keep you informed</h2>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
