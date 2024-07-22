import { getData, getLocations } from '@/api';
import * as d3 from 'd3';
import { Suspense } from 'react';

import { BarChart } from '@/components/BarChart';
import { CovidStats } from '@/components/CovidStats';
import { Vaccinations } from '@/components/Vaccinations';

import styles from './page.module.css';

const formatTime = d3.timeFormat('%d/%m/%Y');

export default async function Page({ params }: { params: { iso: string } }) {
  const { iso } = params;

  const location = await getLocations().then(res => res.get(iso));
  if (!location) return <p>Loading...</p>;

  const data = await getData(iso);

  const lastUpdate = data.slice(-1)[0]?.date && formatTime(new Date(data.slice(-1)[0].date));

  return (
    <div className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.title}>
          <a href={`/`}>🏠</a>
          <div className={styles.titleCard}>
            <h1>{location.location}</h1>
          </div>
        </div>
        <div className={styles.container}>
          <div className={`${styles.card} ${styles.warning}`}>
            <h3>Attention!</h3>
            <p>
              As the world moved from away from pandemic status the information reported to WHO is
              not updated daily and may not represent the correct number of cases per location This
              is just for purpose of data visualisation
              <br />
              Last update: {lastUpdate}
            </p>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <CovidStats data={[...data].reverse()} population={location?.population ?? 0} />
          </div>
          <div className={styles.card}>
            <Vaccinations data={[...data]} population={location?.population ?? 0} />
          </div>
          <div className={styles.card}>
            <h3>Last 14 days</h3>
            <BarChart
              data={[...data]}
              population={location.population}
              dateFormat="%m/%y"
              term="new_cases"
              t14
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <h3>Covid Cases (daily average per week)</h3>
            <BarChart
              data={[...data]}
              population={location.population}
              dateFormat="%m/%y"
              term="new_cases"
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <h3>Covid Deaths (daily average per week)</h3>
            <BarChart
              data={[...data]}
              population={location.population}
              dateFormat="%m/%y"
              term="new_deaths"
              death
            />
          </div>
        </div>
        <div className={styles.spacer} />
      </Suspense>
    </div>
  );
}
