import { useState, useEffect } from "react";
import { json } from "d3";

let url = "https://covid.ourworldindata.org/data/owid-covid-data.json";

export let GetData = () => {
	let [data, setData] = useState();
	useEffect(() => {
		json(url).then((d) => setData(d));
	}, []);
	return data;
};
