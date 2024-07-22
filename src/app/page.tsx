import { getLocations } from '@/api';
import { getCountriesByContinent } from '@/utils';
import { Suspense } from 'react';

import styles from './page.module.css';

export default async function Home() {
  const locations = await getLocations();
  const europe = await getCountriesByContinent({
    data: locations,
    continent: 'Europe',
  });
  const asia = getCountriesByContinent({
    data: locations,
    continent: 'Asia',
  });
  const africa = getCountriesByContinent({
    data: locations,
    continent: 'Africa',
  });
  const northAmerica = getCountriesByContinent({
    data: locations,
    continent: 'North America',
  });
  const southAmerica = getCountriesByContinent({
    data: locations,
    continent: 'South America',
  });
  const oceania = getCountriesByContinent({
    data: locations,
    continent: 'Oceania',
  });
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Welcome, please select a country</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.container}>
          <h2>North America</h2>
          <ul className={styles.list}>
            {northAmerica.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h2>South America</h2>
          <ul className={styles.list}>
            {southAmerica.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h2>Europe</h2>
          <ul className={styles.list}>
            {europe.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h2>Africa</h2>
          <ul className={styles.list}>
            {africa.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h2>Asia</h2>
          <ul className={styles.list}>
            {asia.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h2>Oceania</h2>
          <ul className={styles.list}>
            {oceania.map(country => (
              <li key={country?.location}>
                <a href={`/${country?.isoCode}`}>{country?.location}</a>
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}
