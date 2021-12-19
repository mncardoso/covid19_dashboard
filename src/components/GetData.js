import { useState, useEffect } from "react";
import { json } from "d3";

let url = "https://covid.ourworldindata.org/data/owid-covid-data.json";
// let url =
// 	"https://raw.githubusercontent.com/owid/covid-19-data/5109e77067629da7303057998cf5c7da56c8831d/public/data/owid-covid-data.json";

export let GetData = () => {
	let [data, setData] = useState();

	useEffect(() => {
		json(url).then((d) => setData(d));
	}, []);

	return data;
};
