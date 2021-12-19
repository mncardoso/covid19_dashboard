import { useState } from "react";
import { CasesChart } from "./components/CasesChart";
import { DayInfo } from "./components/DayInfo";
import { GetData } from "./components/GetData";
import { IsoMenu } from "./components/IsoMenu";
import { LastDays } from "./components/LastDays";
import { Vaccination } from "./components/Vaccination";

let widthBig = (window.innerWidth - 180) * 0.75;
let widthSml = window.innerWidth - 180 - widthBig;
let heightBig = window.innerHeight - 380;
let heightSml = (window.innerHeight - 400) * 0.5;

function App() {
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
		"Loading..."
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
				<div className="inner">
					<CasesChart
						data={data}
						isoCode={isoCode}
						width={widthBig}
						height={heightBig}
					/>
				</div>
			</div>
			<div className="vaccination">
				<p className="legend">Vaccinations</p>
				<div className="inner">
					<Vaccination
						data={data}
						isoCode={isoCode}
						width={widthSml}
						height={heightSml}
					/>
				</div>
			</div>
			<div className="lastDays">
				<p className="legend">Last 14 days</p>
				<div className="inner">
					<LastDays
						data={data}
						isoCode={isoCode}
						width={widthSml}
						height={heightSml}
					/>
				</div>
			</div>
			<div className="dayInfo">
				<div className="inner">
					<DayInfo data={data} isoCode={isoCode} />
				</div>
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
				<div className="inner"></div>
			</div>
			<div className="vaccination">
				<p className="legend">Vaccinations</p>
				<div className="inner"></div>
			</div>
			<div className="lastDays">
				<p className="legend">Last 14 days</p>
				<div className="inner"></div>
			</div>
			<div className="dayInfo">
				<div className="inner"></div>
			</div>
		</div>
	);
}

export default App;
