import z from "zod";

const OWID_Validator = z.record(
	z.string(), // iso_code =>	ISO 3166-1 alpha-3 – three-letter country codes
	z.object({
		continent: z.string(), // Continent of the geographical location
		location: z.string(), // Geographical location
		population: z.number(), //Population (latest available values)
		population_density: z.number().optional(), // Number of people divided by land area, measured in square kilometers, most recent year available
		median_age: z.number().optional(), // Median age of the population, UN projection for 2020
		aged_65_older: z.number().optional(), // Share of the population that is 65 years and older, most recent year available
		aged_70_older: z.number().optional(), // Share of the population that is 70 years and older in 2015
		gdp_per_capita: z.number().optional(), // Gross domestic product at purchasing power parity (constant 2011 international dollars), most recent year available
		extreme_poverty: z.number().optional(), // Share of the population living in extreme poverty, most recent year available since 2010
		cardiovasc_death_rate: z.number().optional(), // Death rate from cardiovascular disease in 2017 (annual number of deaths per 100,000 people)
		diabetes_prevalence: z.number().optional(), // Diabetes prevalence (% of population aged 20 to 79) in 2017
		female_smokers: z.number().optional(), // Share of women who smoke, most recent year available
		male_smokers: z.number().optional(), // Share of men who smoke, most recent year available
		handwashing_facilities: z.number().optional(), // Share of the population with basic handwashing facilities on premises, most recent year available
		hospital_beds_per_thousand: z.number().optional(), // Hospital beds per 1,000 people, most recent year available since 2010
		life_expectancy: z.number().optional(), // Life expectancy at birth in 2019
		human_development_index: z.number().optional(), // A composite index measuring average achievement in three basic dimensions of human development—a long and healthy life, knowledge and a decent standard of living.
		data: z.array(
			z.object({
				date: z.string().length(10), // Date of observation
				// Confirmed cases
				total_cases: z.number().optional(), // Total confirmed cases of COVID-19. Counts can include probable cases, where reported.
				new_cases: z.number().optional(), // New confirmed cases of COVID-19. Counts can include probable cases, where reported. In rare cases where our source reports a negative daily change due to a data correction, we set this metric to NA.
				new_cases_smoothed: z.number().optional(), // New confirmed cases of COVID-19 (7-day smoothed). Counts can include probable cases, where reported.
				total_cases_per_million: z.number(), // Total confirmed cases of COVID-19 per 1,000,000 people. Counts can include probable cases, where reported.
				new_cases_per_million: z.number(), // New confirmed cases of COVID-19 per 1,000,000 people. Counts can include probable cases, where reported.
				new_cases_smoothed_per_million: z.number().optional(), // New confirmed cases of COVID-19 (7-day smoothed) per 1,000,000 people. Counts can include probable cases, where reported.
				// Confirmed deaths
				total_deaths: z.number().optional(), // Total deaths attributed to COVID-19. Counts can include probable deaths, where reported.
				new_deaths: z.number().optional(), //New deaths attributed to COVID-19. Counts can include probable deaths, where reported. In rare cases where our source reports a negative daily change due to a data correction, we set this metric to NA.
				new_deaths_smoothed: z.number().optional(), // New deaths attributed to COVID-19 (7-day smoothed). Counts can include probable deaths, where reported.
				total_deaths_per_million: z.number().optional(), // Total deaths attributed to COVID-19 per 1,000,000 people. Counts can include probable deaths, where reported.
				new_deaths_per_million: z.number().optional(), // New deaths attributed to COVID-19 per 1,000,000 people. Counts can include probable deaths, where reported.
				new_deaths_smoothed_per_million: z.number().optional(), // New deaths attributed to COVID-19 (7-day smoothed) per 1,000,000 people. Counts can include probable deaths, where reported.
				// Excess mortality
				excess_mortality: z.number().optional(), // Percentage difference between the reported number of weekly or monthly deaths in 2020–2021 and the projected number of deaths for the same period based on previous years.
				excess_mortality_cumulative: z.number().optional(), // Percentage difference between the cumulative number of deaths since 1 January 2020 and the cumulative projected deaths for the same period based on previous years.
				excess_mortality_cumulative_absolut: z.number().optional(), // Cumulative difference between the reported number of deaths since 1 January 2020 and the projected number of deaths for the same period based on previous years.
				excess_mortality_cumulative_per_million: z.number().optional(), // Cumulative difference between the reported number of deaths since 1 January 2020 and the projected number of deaths for the same period based on previous years, per million people.
				// Hospital & ICU
				icu_patients: z.number().optional(), // Number of COVID-19 patients in intensive care units (ICUs) on a given day
				icu_patients_per_million: z.number().optional(), // Number of COVID-19 patients in intensive care units (ICUs) on a given day per 1,000,000 people
				hosp_patients: z.number().optional(), // Number of COVID-19 patients in hospital on a given day
				hosp_patients_per_million: z.number().optional(), // Number of COVID-19 patients in hospital on a given day per 1,000,000 people
				weekly_icu_admissions: z.number().optional(), // Number of COVID-19 patients newly admitted to intensive care units (ICUs) in a given week (reporting date and the preceeding 6 days)
				weekly_icu_admissions_per_million: z.number().optional(), // Number of COVID-19 patients newly admitted to intensive care units (ICUs) in a given week per 1,000,000 people (reporting date and the preceeding 6 days)
				weekly_hosp_admissions: z.number().optional(), // Number of COVID-19 patients newly admitted to hospitals in a given week (reporting date and the preceeding 6 days)
				weekly_hosp_admissions_per_million: z.number().optional(), // Number of COVID-19 patients newly admitted to hospitals in a given week per 1,000,000 people (reporting date and the preceeding 6 days)
				// Policy responses
				stringency_index: z.number().optional(), // Government Response Stringency Index: composite measure based on 9 response indicators including school closures, workplace closures, and travel bans, rescaled to a value from 0 to 100 (100 = strictest response)
				// Reproduction rate
				reproduction_rate: z.number().optional(), // Real-time estimate of the effective reproduction rate (R) of COVID-19.
				// Tests & positivity
				total_tests: z.number().optional(), // Total tests for COVID-19
				new_tests: z.number().optional(), // New tests for COVID-19 (only calculated for consecutive days)
				total_tests_per_thousand: z.number().optional(), // Total tests for COVID-19 per 1,000 people
				new_tests_per_thousand: z.number().optional(), // New tests for COVID-19 per 1,000 people
				new_tests_smoothed: z.number().optional(), // New tests for COVID-19 (7-day smoothed). For countries that don't report testing data on a daily basis, we assume that testing changed equally on a daily basis over any periods in which no data was reported. This produces a complete series of daily figures, which is then averaged over a rolling 7-day window
				new_tests_smoothed_per_thousand: z.number().optional(), // New tests for COVID-19 (7-day smoothed) per 1,000 people
				positive_rate: z.number().optional(), // The share of COVID-19 tests that are positive, given as a rolling 7-day average (this is the inverse of tests_per_case)
				tests_per_case: z.number().optional(), // Tests conducted per new confirmed case of COVID-19, given as a rolling 7-day average (this is the inverse of positive_rate)
				tests_units: z.number().optional(), // Units used by the location to report its testing data
				// Vaccinations
				total_vaccinations: z.number().optional(), // Total number of COVID-19 vaccination doses administered
				people_vaccinated: z.number().optional(), //  Total number of people who received at least one vaccine dose
				people_fully_vaccinated: z.number().optional(), // Total number of people who received all doses prescribed by the initial vaccination protocol
				total_boosters: z.number().optional(), // Total number of COVID-19 vaccination booster doses administered (doses administered beyond the number prescribed by the vaccination protocol)
				new_vaccinations: z.number().optional(), // New COVID-19 vaccination doses administered (only calculated for consecutive days)
				new_vaccinations_smoothed: z.number().optional(), // New COVID-19 vaccination doses administered (7-day smoothed). For countries that don't report vaccination data on a daily basis, we assume that vaccination changed equally on a daily basis over any periods in which no data was reported. This produces a complete series of daily figures, which is then averaged over a rolling 7-day window
				total_vaccinations_per_hundred: z.number().optional(), // Total number of COVID-19 vaccination doses administered per 100 people in the total population
				people_vaccinated_per_hundred: z.number().optional(), // Total number of people who received at least one vaccine dose per 100 people in the total population
				people_fully_vaccinated_per_hundred: z.number().optional(), // Total number of people who received all doses prescribed by the initial vaccination protocol per 100 people in the total population
				total_boosters_per_hundred: z.number().optional(), // Total number of COVID-19 vaccination booster doses administered per 100 people in the total population
				new_vaccinations_smoothed_per_million: z.number().optional(), // New COVID-19 vaccination doses administered (7-day smoothed) per 1,000,000 people in the total population
				new_people_vaccinated_smoothed: z.number().optional(), // Daily number of people receiving their first vaccine dose (7-day smoothed)
				new_people_vaccinated_smoothed_per_hundred: z.number().optional(), // Daily number of people receiving their first vaccine dose (7-day smoothed) per 100 people in the total population
			})
		),
	})
);
export type OWID_Type = z.infer<typeof OWID_Validator>;

const PARSE_Validator = z.map(
	z.string().length(3),
	z.object({
		isoCode: z.string().length(3),
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
	})
);
export type PARSE_Type = z.infer<typeof PARSE_Validator>;

const DATAinput_Validator = z.object({
	isoCode: z.string().length(3),
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

const ISO_Validator = z.string().length(3);
export type ISO_Type = z.infer<typeof ISO_Validator>;

const DATA_Validator = z
	.function()
	.args(
		z.object({
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
			dateFromat: z.enum(["%m/%y", "%d"]).optional(),
			id: z.enum(["new_cases", "last_days", "new_deaths"]).optional(),
			termMain: z
				.enum(["new_cases_smoothed", "new_deaths_smoothed"])
				.optional(),
			termSub: z.enum(["new_cases", "new_deaths"]).optional(),
			death: z.boolean().optional(),
			t14: z.boolean().optional(),
			serverDate: z.string().optional(),
		})
	)
	.returns(z.any());
export type DATA_Function = z.infer<typeof DATA_Validator>;

const LINE_Validator = z
	.function()
	.args(
		z.object({
			population: z.number().optional(),
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
			dateFromat: z.enum(["%m/%y", "%d"]),
			id: z.enum(["new_cases", "last_days", "new_deaths"]),
			termMain: z.enum(["new_cases_smoothed", "new_deaths_smoothed"]),
			termSub: z.enum(["new_cases", "new_deaths"]),
			death: z.boolean().optional(),
			t14: z.boolean().optional(),
		})
	)
	.returns(z.any());
export type LINE_Function = z.infer<typeof LINE_Validator>;
