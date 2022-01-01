import { useState } from "react";
import { CasesChart } from "./components/CasesChart";
import { DayInfo } from "./components/DayInfo";
import { GetData } from "./components/GetData";
import { IsoMenu } from "./components/IsoMenu";
import { LastDays } from "./components/LastDays";
import { Vaccination } from "./components/Vaccination";

let widthBig = ((window.innerWidth - 20) / 3) * 2 - 45;
let widthSml = (window.innerWidth - 20) / 3 - 45;
let heightBig = ((window.innerHeight - 25) / 12) * 10 - 45;
let heightSml = ((window.innerHeight - 25) / 12) * 5 - 45;

function refreshPage() {
	window.location.reload(false);
}

function App() {
	let data = GetData();
	let [isoCode, setIsoCode] = useState("OWID_WRL");
	let menu = data ? (
		<div className="menuBar">
			<button onClick={refreshPage}>↺</button>
			<IsoMenu
				options={Object.keys(data)}
				id="location-select"
				selectedValue={isoCode}
				onSelectedValueChange={setIsoCode}
				data={data}
			/>
		</div>
	) : (
		<div className="menu">
			<p>Loading...</p>
		</div>
	);

	return data ? (
		<div className="cont">
			<div className="topBar">
				<div className="inner">
					<div>{menu}</div>
				</div>
			</div>
			<div className="cases">
				<p className="legend">Covid Cases Smothed</p>
				<div className="inner" id="casesInner">
					<CasesChart
						data={data}
						isoCode={isoCode}
						width={
							document.getElementById("casesInner").getBoundingClientRect()[
								"width"
							]
						}
						height={
							document.getElementById("casesInner").getBoundingClientRect()[
								"height"
							] - 10
						}
					/>
				</div>
			</div>
			<div className="vaccination">
				<p className="legend">Vaccinations</p>
				<div className="inner" id="vaccinationInner">
					<Vaccination
						data={data}
						isoCode={isoCode}
						width={
							document
								.getElementById("vaccinationInner")
								.getBoundingClientRect()["width"]
						}
						height={
							document
								.getElementById("vaccinationInner")
								.getBoundingClientRect()["height"] - 10
						}
					/>
				</div>
			</div>
			<div className="lastDays">
				<p className="legend">Last 14 days</p>
				<div className="inner" id="lastDaysInner">
					<LastDays
						data={data}
						isoCode={isoCode}
						width={
							document.getElementById("lastDaysInner").getBoundingClientRect()[
								"width"
							]
						}
						height={
							document.getElementById("lastDaysInner").getBoundingClientRect()[
								"height"
							] - 10
						}
					/>
				</div>
			</div>
			<div className="dayInfo">
				<DayInfo data={data} isoCode={isoCode} />
			</div>
		</div>
	) : (
		<div className="cont">
			<div className="topBar">
				<div className="inner">
					<div>{menu}</div>
				</div>
			</div>
			<div className="cases">
				<p className="legend">Covid Cases Smothed</p>
				<div className="inner" id="casesInner"></div>
			</div>
			<div className="vaccination">
				<p className="legend">Vaccinations</p>
				<div className="inner" id="vaccinationInner"></div>
			</div>
			<div className="lastDays">
				<p className="legend">Last 14 days</p>
				<div className="inner" id="lastDaysInner"></div>
			</div>
			<div className="dayInfo">
				<div className="innerDay">
					<p>Last Update:</p>
				</div>
				<div className="innerCases">
					<p>New Cases:</p>
				</div>
				<div className="innerDeaths">
					<p>New Deaths:</p>
				</div>
			</div>
		</div>
	);
}

export default App;
