import { env } from "@/env/server.mjs";
import { createRouter } from "@/server/router/context";
import { z } from "zod";

export const owid = createRouter()
	.query("countries", {
		async resolve() {
			const response = await fetch(env.DATA_URL + "countries.json");
			const countries = await response.json();
			return countries;
		},
	})
	.query("iso", {
		input: z.object({
			text: z.string(),
		}),
		async resolve({ input }) {
			const response = await fetch(env.DATA_URL + input.text + ".json");
			const isoData = await response.json();
			return isoData;
		},
	});
