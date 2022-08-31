import { env } from "@/env/server.mjs";
import { NextApiRequest, NextApiResponse } from "next";

const data = async () => {
	const response = await fetch(env.DATA_URL + "countries.json");
	return response.json();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	data()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}
