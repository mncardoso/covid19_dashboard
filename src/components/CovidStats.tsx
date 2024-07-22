import { type_stats } from '@/types';
import * as d3 from 'd3';

import styles from './CovidStats.module.css';

const formatTime = d3.timeFormat('%d/%m/%Y');

export const CovidStats: type_stats = ({ data, population }) => {
  const newCases = data.slice(-1)[0]?.new_cases;
  const newDeaths = data.slice(-1)[0]?.new_deaths;
  const lastReportedValue = data.find(rt => +rt.new_cases > 0);

  const lastReproductionRate = data.find(rt => +rt.reproduction_rate > 0)?.reproduction_rate;

  const last7Days = data.map(d => d.new_cases).slice(-7);
  const statusScale = d3.scaleLinear().range([0, 10000]).domain([0, population]);
  const perDay = Math.floor(statusScale(d3.sum(last7Days)));

  const getStatus = () => {
    return perDay >= 48 ? (
      <h3>
        <span className={styles.alert6}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : perDay >= 24 ? (
      <h3>
        <span className={styles.alert5}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : perDay >= 12 ? (
      <h3>
        <span className={styles.alert4}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : perDay >= 6 ? (
      <h3>
        <span className={styles.alert3}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : perDay >= 3 ? (
      <h3>
        <span className={styles.alert2}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : perDay >= 1 ? (
      <h3>
        <span className={styles.alert1}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    ) : (
      <h3>
        <span className={styles.alert0}>{perDay}</span>
        {' in 10 000 people per day'}
      </h3>
    );
  };

  return (
    <div className={styles.data}>
      <div>
        <h3>Latest Status</h3>
      </div>
      <div className={styles.status}>
        <p>status</p>
        {getStatus()}
      </div>
      <div>
        <div className={styles.title}>
          <p>Reproduction rate</p>
          <h3>{lastReproductionRate}</h3>
        </div>
      </div>
      <div className={styles.new}>
        <div>
          <p>New Cases</p>
          <h3>{newCases}</h3>
        </div>
        <div>
          <p>New Deaths</p>
          <h3>{newDeaths}</h3>
        </div>
      </div>
      <div className={styles.new}>
        <div>
          <p>Last reported new cases</p>
          <h3>
            {lastReportedValue?.new_cases} on {formatTime(new Date(lastReportedValue?.date || ''))}
          </h3>
        </div>
      </div>
    </div>
  );
};
