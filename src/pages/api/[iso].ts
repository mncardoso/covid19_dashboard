import { env } from "@/env/server.mjs";
import { NextApiRequest, NextApiResponse } from "next";

const data = async (iso: string | string[] | undefined) => {
	const response = await fetch(env.DATA_URL + iso + ".json");
	return response.json();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req;
	const { iso } = query;
	data(iso)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}
