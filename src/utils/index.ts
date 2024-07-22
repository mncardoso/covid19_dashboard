import { type_locations } from '@/types';

type continents = 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania';

export function getCountriesByContinent({
  data,
  continent,
}: {
  data: type_locations;
  continent: continents;
}) {
  return Array.from(data.keys())
    .map(iso => {
      return data?.get(iso)?.continent === continent ? data?.get(iso) : null;
    })
    .filter(Boolean);
}
