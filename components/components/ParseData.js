export let ParseData = (data) => {
	let keys = Object.keys(data);
	let unwantedISO = [
		"OWID_AFR",
		"OWID_ASI",
		"OWID_EUR",
		"OWID_EUN",
		"OWID_HIC",
		"OWID_INT",
		"OWID_KOS",
		"OWID_LIC",
		"OWID_LMC",
		"OWID_NAM",
		"OWID_CYN",
		"OWID_OCE",
		"OWID_SAM",
		"OWID_UMC",
	];
	let ISO = keys.filter((d) => !unwantedISO.includes(d));
	let parsedData = {};
	ISO.forEach((iso) => {
		let isoCode = iso === "OWID_WRL" ? "WRL" : iso;
		parsedData[isoCode] = {};
		parsedData[isoCode] = {
			isoCode: iso,
			location: data[iso]["location"],
			population: data[iso]["population"],
			data: data[iso]["data"].map((d) => {
				return {
					date: d["date"],
					new_cases: d["new_cases"] ? d["new_cases"] : 0,
					new_cases_smoothed: d["new_cases_smoothed"]
						? d["new_cases_smoothed"]
						: 0,
					new_deaths: d["new_deaths"] ? d["new_deaths"] : 0,
					new_deaths_smoothed: d["new_deaths_smoothed"]
						? d["new_deaths_smoothed"]
						: 0,
					reproduction_rate: d["reproduction_rate"]
						? d["reproduction_rate"]
						: 0,
					people_vaccinated: d["people_vaccinated"]
						? d["people_vaccinated"]
						: 0,
					people_fully_vaccinated: d["people_fully_vaccinated"]
						? d["people_fully_vaccinated"]
						: 0,
					total_boosters: d["total_boosters"] ? d["total_boosters"] : 0,
				};
			}),
		};
	});

	return parsedData;
};
