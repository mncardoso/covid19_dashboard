import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CovidStats } from "../components/graphql/CovidStats";

// let Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
// 	ssr: false,
// });

// export let getStaticProps = async () => {
// 	const res = await fetch(
// 		"https://covid.ourworldindata.org/data/owid-covid-data.json"
// 	);
// 	const data = await res.json();

// 	return {
// 		props: {
// 			data,
// 		},
// 		revalidate: 43200, // 12h
// 	};
// };

// export let getStaticPaths = async () => {
// 	const res = await fetch(
// 		"https://covid.ourworldindata.org/data/owid-covid-data.json"
// 	);
// 	const data = await res.json();

// 	const paths = Object.keys(data).map((d) => ({
// 		params: { iso: d },
// 	}));
// 	return { paths, fallback: "blocking" };
// };

let Home = () => {
	// console.log(data);
	// let [isoCode, setIsoCode] = useState("OWID_WRL");
	// let size = {
	// 	big: {
	// 		width: ((window.innerWidth - 184) / 3) * 2 - 32,
	// 		height: ((window.innerHeight - 174) / 3) * 2 - 64,
	// 	},
	// 	small: {
	// 		width: (window.innerWidth - 184) / 3 - 32,
	// 		height: (window.innerHeight - 174) / 3 - 64,
	// 	},
	// };
	// let menu = (
	// 	<IsoMenu
	// 		options={Object.keys(data)}
	// 		id="location-select"
	// 		selectedValue={isoCode}
	// 		onSelectedValueChange={setIsoCode}
	// 		data={data}
	// 	/>
	// );
	return (
		<div>
			<Head>
				<title>Covid Dashboard | Data</title>
			</Head>
			<main className="charts">
				<div className="title">
					{/* <h1>{data[isoCode]["location"]}</h1>
					<div>{menu}</div> */}
				</div>
				<div className="cases">
					<div className="section">
						<h2>Covid Cases</h2>
						<div className="content">
							{/* <LineChart
								data={data}
								isoCode={isoCode}
								width={size.big.width}
								height={size.big.height}
								dateFromat="%m/%y"
								termMain="new_cases_smoothed"
								termSub="new_cases"
								death={false}
								t14={false}
							/> */}
						</div>
					</div>
				</div>
				<div className="lastdays">
					<div className="section">
						<h2>Last 14 days</h2>
						<div className="content">
							{/* <LineChart
								data={data}
								isoCode={isoCode}
								width={size.small.width}
								height={size.small.height}
								dateFromat="%d"
								termMain="new_cases_smoothed"
								termSub="new_cases"
								death={false}
								t14={true}
							/> */}
						</div>
					</div>
				</div>
				<div className="vaccinations">
					<div className="section">
						<h2>Vaccinations</h2>
						<div className="content">
							{/* <Vaccinations
								data={data}
								isoCode={isoCode}
								width={size.small.width}
							/> */}
						</div>
					</div>
				</div>
				<div className="deaths">
					<div className="section">
						<h2>Covid Deaths</h2>
						<div className="content">
							{/* <LineChart
								data={data}
								isoCode={isoCode}
								width={size.big.width}
								height={size.small.height}
								dateFromat="%m/%y"
								termMain="new_deaths_smoothed"
								termSub="new_deaths"
								death={true}
								t14={false}
							/> */}
						</div>
					</div>
				</div>
				<div className="stats">
					<div className="section">
						<h2>Covid Stats</h2>
						<div className="content">
							{/* <CovidStats data={data} isoCode={isoCode} /> */}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
