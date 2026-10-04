import Link from 'next/link';

import { getLocations } from '@/api';
import { getCountriesByContinent } from '@/utils';

import styles from './page.module.css';

const continents = [
  'North America',
  'South America',
  'Europe',
  'Africa',
  'Asia',
  'Oceania',
] as const;

export default async function Home() {
  const locations = await getLocations();

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Welcome, please select a country</h1>
      </div>
      {continents.map(continent => {
        const countries = getCountriesByContinent({ data: locations, continent });
        return (
          <div className={styles.container} key={continent}>
            <h2>{continent}</h2>
            <ul className={styles.list}>
              {countries.map(country => (
                <li key={country.isoCode}>
                  <Link href={`/${country.isoCode}`}>{country.location}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
