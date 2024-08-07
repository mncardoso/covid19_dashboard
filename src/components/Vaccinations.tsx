// @ts-nocheck
import { FUNCTION_Type } from '@/types';
import * as d3 from 'd3';

import styles from './Vaccinations.module.css';

export const Vaccinations: FUNCTION_Type = ({ data, population }) => {
  const dataVax1 = data.map(d => (!d.people_vaccinated ? 0 : d.people_vaccinated));
  const dataVax2 = data.map(d => (!d.people_fully_vaccinated ? 0 : d.people_fully_vaccinated));
  const dataVax3 = data.map(d => (!d.total_boosters ? 0 : d.total_boosters));

  const percentage = d3.scaleLinear().domain([0, population]).range([0, 100]);

  const vaccinationNum = {
    zero: population - d3.max(dataVax1),
    one: d3.max(dataVax1) - d3.max(dataVax2),
    two: d3.max(dataVax2) - d3.max(dataVax3),
    three: d3.max(dataVax3),
  };

  const barHeight = 16;

  return (
    <div className={styles.data}>
      <div>
        <h3>Vaccination Stats</h3>
      </div>
      <div>
        <div className={styles.title}>
          <p>0 Vaccines</p>
          <p>{percentage(vaccinationNum.zero).toFixed(2) + '%'}</p>
        </div>
        <svg width="100%" height={barHeight}>
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width="100%"
            height={barHeight}
            className={styles.red_bg}
          />
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width={percentage(vaccinationNum.zero).toFixed(2) + '%'}
            height={barHeight}
            className={styles.red_fg}
          />
        </svg>
      </div>
      <div>
        <div className={styles.title}>
          <p>1 Vaccine</p>
          <p>{percentage(vaccinationNum.one).toFixed(2) + '%'}</p>
        </div>
        <svg width="100%" height={barHeight}>
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width="100%"
            height={barHeight}
            className={styles.blue_bg}
          />
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width={percentage(vaccinationNum.one).toFixed(2) + '%'}
            height={barHeight}
            className={styles.blue_fg}
          />
        </svg>
      </div>
      <div>
        <div className={styles.title}>
          <p>2 Vaccines</p>
          <p>{percentage(vaccinationNum.two).toFixed(2) + '%'}</p>
        </div>
        <svg width="100%" height={barHeight}>
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width="100%"
            height={barHeight}
            className={styles.blue_bg}
          />
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width={percentage(vaccinationNum.two).toFixed(2) + '%'}
            height={barHeight}
            className={styles.blue_fg}
          />
        </svg>
      </div>
      <div>
        <div className={styles.title}>
          <p>3 Vaccines</p>
          <p>{percentage(vaccinationNum.three).toFixed(2) + '%'}</p>
        </div>
        <svg width="100%" height={barHeight}>
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width="100%"
            height={barHeight}
            className={styles.blue_bg}
          />
          <rect
            x="0"
            y="0"
            rx="var(--inner-border-radius)"
            ry="var(--inner-border-radius)"
            width={percentage(vaccinationNum.three).toFixed(2) + '%'}
            height={barHeight}
            className={styles.blue_fg}
          />
        </svg>
      </div>
    </div>
  );
};
