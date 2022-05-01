import { useState, useEffect } from "react";
// import { GetStaticProps } from "next";
import { json } from "d3";

let url = "https://covid.ourworldindata.org/data/owid-covid-data.json";

export let GetData = () => {
	let [data, setData] = useState();
	useEffect(() => {
		json(url).then((d) => setData(d));
	}, []);
	return data;
};

// export const getStaticProps = async () => {
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
