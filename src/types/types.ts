import z from "zod";

const LIST_Validator = z.map(
	z.string().length(3),
	z.object({
		isoCode: z.string().length(3),
		location: z.string(),
		continent: z.string(),
		population: z.number(),
	})
);
export type LIST_Type = z.infer<typeof LIST_Validator>;

const ISO_Validator = z.array(
	z.object({
		date: z.string().length(10),
		new_cases: z.number().int().nonnegative(),
		new_deaths: z.number().int().nonnegative(),
		reproduction_rate: z.number().nonnegative(),
		people_vaccinated: z.number().int().nonnegative(),
		people_fully_vaccinated: z.number().int().nonnegative(),
		total_boosters: z.number().int().nonnegative(),
	})
);
export type ISO_Type = z.infer<typeof ISO_Validator>;

const DATAinput_Validator = z.object({
	location: z.string(),
	population: z.number(),
	data: z.array(
		z.object({
			date: z.string().length(10),
			new_cases: z.number().int().nonnegative(),
			new_cases_smoothed: z.number().nonnegative(),
			new_deaths: z.number().int().nonnegative(),
			new_deaths_smoothed: z.number().nonnegative(),
			reproduction_rate: z.number().nonnegative(),
			people_vaccinated: z.number().int().nonnegative(),
			people_fully_vaccinated: z.number().int().nonnegative(),
			total_boosters: z.number().int().nonnegative(),
		})
	),
});
export type DATAinput_Type = z.infer<typeof DATAinput_Validator>;

const FUNCTION_Validator = z
	.function()
	.args(
		z.object({
			population: z.number(),
			data: z.array(
				z.object({
					date: z.string().length(10),
					new_cases: z.number().int().nonnegative(),
					new_deaths: z.number().int().nonnegative(),
					reproduction_rate: z.number().nonnegative(),
					people_vaccinated: z.number().int().nonnegative(),
					people_fully_vaccinated: z.number().int().nonnegative(),
					total_boosters: z.number().int().nonnegative(),
				})
			),
			dateFromat: z.enum(["%m/%y", "%d"]).optional(),
			id: z.enum(["new_cases", "last_days", "new_deaths"]).optional(),
			term: z.enum(["new_cases", "new_deaths"]).optional(),
			death: z.boolean().optional(),
			t14: z.boolean().optional(),
		})
	)
	.returns(z.unknown());
export type FUNCTION_Type = z.infer<typeof FUNCTION_Validator>;
