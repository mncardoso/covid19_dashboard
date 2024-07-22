import z from 'zod';

const locations = z.map(
  z.string().length(3),
  z.object({
    isoCode: z.string().length(3),
    location: z.string(),
    continent: z.string(),
    population: z.number(),
  })
);
export type type_locations = z.infer<typeof locations>;

const iso = z.array(
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
);
export type type_iso = z.infer<typeof iso>;

const barChart = z
  .function()
  .args(
    z.object({
      data: iso,
      population: z.number(),
      dateFormat: z.enum(['%m/%y', '%d']),
      term: z.enum(['new_cases', 'new_deaths']),
      death: z.boolean().optional(),
      t14: z.boolean().optional(),
    })
  )
  .returns(z.any());
export type type_barChart = z.infer<typeof barChart>;

const stats = z
  .function()
  .args(
    z.object({
      data: iso,
      population: z.number(),
    })
  )
  .returns(z.any());
export type type_stats = z.infer<typeof stats>;
