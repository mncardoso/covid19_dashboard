import { BarChart } from "@/components/graphs/BarChart";
import { CovidStats } from "@/components/graphs/CovidStats";
import { Vaccinations } from "@/components/graphs/Vaccinations";
import { DATAinput_Type } from "@/types/types";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import { useRouter } from "next/router";

const Iso = () => {
	const router = useRouter();
	const { data, isLoading } = trpc.useQuery(["owid.countries"]);
	const { data: dataISO, isLoading: isLoadingISO } = trpc.useQuery([
		"owid.iso",
		{ text: String(router.query.iso) },
	]);

	if (!isLoading && !isLoadingISO) {
		const props = {
			location: data[String(router.query.iso)]?.location,
			population: data[String(router.query.iso)]?.population,
			data: dataISO,
		};
		return (
			<div>
				<Head>
					<title>{`Covid Dashboard | ${props.location}`}</title>
				</Head>
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
							<CovidStats data={props.data} population={props.population} />
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
				</main>
			</div>
		);
	}
};
export default Iso;

// export async function getStaticPaths() {
// 	const response = await fetch(
// 		"https://covid-dashboard.app/api/trpc/owid.countries?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D"
// 	);
// 	const data = await response.json();
// 	const paths = data.map((country: { iso: string }) => ({
// 		params: { iso: country.iso },
// 	}));
// 	return { paths, fallback: false };
// }

// export async function getStaticProps(params: { iso: string }) {
// 	const response = await fetch(
// 		"https://covid-dashboard.app/api/trpc/owid.countries?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D"
// 	);
// 	const dataCountries = await response.json();
// 	const responseISO = await fetch(
// 		`https://covid-dashboard.app/api/trpc/owid.iso?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22text%22%3A%22${params.iso}%22%7D%7D%7D`
// 	);
// 	const data = await responseISO.json();
// 	return {
// 		props: {
// 			location: dataCountries[params.iso]?.location,
// 			population: dataCountries[params.iso]?.population,
// 			data: data,
// 		},
// 		revalidate: 3600,
// 	};
// }
