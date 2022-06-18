import { useState, useEffect, useDebugValue } from "react";
import { ParseData } from "./ParseData";

let url = "https://covid.ourworldindata.org/data/owid-covid-data.json";

export let GetData = () => {
	let [data, setData] = useState();
	useEffect(() => {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				return ParseData(json);
			})
			.then((data) => {
				setData(data);
			});
	}, []);
	useDebugValue(data ? "data" : "no data");
	return data;
};
