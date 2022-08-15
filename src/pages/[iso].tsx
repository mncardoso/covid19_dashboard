import { CovidStats } from "@/components/graphs/CovidStats";
import { LineChart } from "@/components/graphs/LineChart";
import { Vaccinations } from "@/components/graphs/Vaccinations";
import { DATAinput_Type } from "@/types/types";
import { trpc } from "@/utils/trpc";
import next from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Iso = () => {
	const router = useRouter();
	const iso = router.query.iso as string;

	const { data: dataCountries, isLoading: isLoadingCountries } = trpc.useQuery([
		"owid.countries",
	]);
	const { data: dataIso, isLoading: isLoadingIso } = trpc.useQuery([
		"owid.iso",
		{ text: iso },
	]);
	if (!isLoadingCountries && !isLoadingIso) {
		return (
			<div>
				<Head>
					<title>{`Covid Dashboard | ${dataCountries[iso]?.location}`}</title>
				</Head>
				<main className="charts">
					<div className="title">
						<h1>{`${dataCountries[iso]?.location}`}</h1>
					</div>
					<div className="cases section">
						<h2>Covid Cases</h2>
						<div className="content" id="new_cases">
							<LineChart
								data={dataIso}
								population={dataCountries[iso].population}
								id="new_cases"
								dateFromat="%m/%y"
								termMain="new_cases_smoothed"
								termSub="new_cases"
								death={false}
								t14={false}
							/>
						</div>
					</div>
					<div className="stats section" id="stats">
						<h2>Covid Stats</h2>
						<div className="content">
							<CovidStats
								data={dataIso}
								population={dataCountries[iso].population}
							/>
						</div>
					</div>
					<div className="lastdays section">
						<h2>Last 14 days</h2>
						<div className="content" id="last_days">
							<LineChart
								data={dataIso}
								population={dataCountries[iso].population}
								id="last_days"
								dateFromat="%d"
								termMain="new_cases_smoothed"
								termSub="new_cases"
								death={false}
								t14={true}
							/>
						</div>
					</div>
					<div className="deaths section">
						<h2>Covid Deaths</h2>
						<div className="content" id="new_deaths">
							<LineChart
								data={dataIso}
								population={dataCountries[iso].population}
								id="new_deaths"
								dateFromat="%m/%y"
								termMain="new_deaths_smoothed"
								termSub="new_deaths"
								death={true}
								t14={false}
							/>
						</div>
					</div>
					<div className="vaccinations section">
						<h2>Vaccinations</h2>
						<div className="content">
							<Vaccinations
								data={dataIso}
								population={dataCountries[iso].population}
							/>
						</div>
					</div>
				</main>
			</div>
		);
	}
	return <div>Loading...</div>;
};

export default Iso;
