'use client';

import { type_barChart } from '@/types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import styles from './BarChart.module.css';

// > types
type typeDataAverage = {
  date: string;
  new_cases: number;
  new_deaths: number;
}[];

// > settings
const mTop = 0;
const mBottom = 12;
const mLeft = 33;
const mRight = -33;
const defaultHeight = 500;
const defaultWidth = 1280;

const d3TimeParse = d3.timeParse('%Y-%m-%d') as (arg0: string) => Date;
const d3Min = d3.min as (arg0: number[]) => number;
const d3Max = d3.max as (arg0: number[]) => number;

export const BarChart: type_barChart = ({
  data, // data for graph
  dateFormat, // date format
  term, // term for the main line
  death = false, // if death is true, the will be red
  t14 = false, // if true, will show the last 14 days of data
}) => {
  const ref = useRef<SVGSVGElement>(null);

  // > settings

  const styleClass = death ? styles.cases_red : styles.cases;
  const t = !t14 ? 0 : -14;
  const isDayFormat = dateFormat === '%d';

  const height = !t14 ? defaultHeight : defaultHeight * 0.7;
  const width = !t14 ? defaultWidth : defaultWidth / 2;

  const size = {
    width: width - (mLeft + mRight),
    height: height - (mTop + mBottom),
  };

  // > compute data
  const dataReverse = [...data].reverse();
  const dataAverage: typeDataAverage = [];
  let days = 0;
  let cases = 0;
  let deaths = 0;

  dataReverse.map(d => {
    if (days <= 7) {
      cases += d.new_cases;
      deaths += d.new_deaths;
      days += 1;
    } else {
      days = 0;
      dataAverage.push({
        date: d.date,
        new_cases: cases / 7,
        new_deaths: deaths / 7,
      });
      cases = 0;
      deaths = 0;
    }
  });

  const isoData = !t14 ? dataAverage : data.slice(t);

  // Compute values
  const xValues = isoData.map(d => (!d.date ? 0 : +d3TimeParse(d.date)));
  const yValues = isoData.map(d => (!d[term] ? 0 : +d[term]));

  const values = isoData.map(d => ({
    date: !d.date ? 0 : +d3TimeParse(d.date),
    cases: !d[term] ? 0 : +d[term],
  }));

  const I = d3.range(xValues.length).filter(d => xValues[d] !== 0);

  const xMinMax = {
    min: d3Min(xValues),
    max: d3Max(xValues),
  };
  const yMinMax = {
    min: d3Min(yValues) - d3Min(yValues) * 0.01,
    max: d3Max(yValues) + d3Max(yValues) * 0.01,
  };
  const xDomain = [xMinMax.min, xMinMax.max];
  const yDomain = [0, yMinMax.max];

  const xRange = [mLeft + 16, size.width - mRight - 16];
  const yRange = [size.height - mBottom, mTop];
  const xScale = d3.scaleTime().domain(xDomain).range(xRange);
  const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

  const tick = isDayFormat ? d3.timeDay.every(1) : d3.timeMonth.every(1);
  const tickFormat = isDayFormat
    ? d3.timeFormat('%d')
    : (date: Date) => (date <= d3.timeYear(date) ? date.getFullYear() : null);

  const xAxis = d3
    .axisBottom(xScale)
    .tickSizeInner(5)
    .tickPadding(5)
    .ticks(tick)
    // @ts-ignore: Unreachable code error
    .tickFormat(tickFormat)
    .tickSizeOuter(0);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSizeInner(-size.width + mLeft)
    .tickPadding(5)
    .ticks(12)
    // @ts-ignore: Unreachable code error
    .tickFormat(x => (x > 999999 ? `${x / 1000000} M` : x > 999 ? `${x / 1000} K` : x));

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg.selectAll('*').remove();

    // > draw
    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('strokeLinecap', 'round')
      .attr('strokeLinejoin', 'round');

    // > draw
    svg
      .append('g')
      .attr('transform', `translate(0, ${size.height - 10})`)
      // @ts-ignore: Unreachable code error
      .call(xAxis)
      .call(g =>
        g
          .append('text')
          .attr('dx', '0px')
          .attr('dy', '10px')
          .attr('transform', 'rotate(0)')
          .attr('font-size', '30px')
          .attr('vector-effect', 'non-scaling-size')
      )
      .call(g =>
        g
          .selectAll('line')
          .attr('stroke-width', '1')
          .attr('stroke', 'var(--color-primary)')
          .attr('vector-effect', 'non-scaling-size')
      )
      .call(g => g.selectAll('path').remove());

    svg
      .append('g')
      .attr('transform', `translate(${mLeft},0)`)
      // @ts-ignore: Unreachable code error
      .call(yAxis)
      .call(g =>
        g
          .append('text')
          .attr('dx', '-3px')
          .attr('dy', '3px')
          .attr('transform', 'rotate(0)')
          .attr('font-size', '30px')
          .attr('vector-effect', 'non-scaling-size')
      )
      .call(g =>
        g
          .selectAll('line')
          .attr('stroke-width', '1')
          .attr('stroke', 'var(--color-neutral-muted)')
          .attr('vector-effect', 'non-scaling-stroke')
      )
      .call(g => g.selectAll('path').remove());

    svg
      .append('g')
      .attr('class', styleClass)
      .selectAll('rect')
      .data(values)
      .enter()
      .append('rect')
      .attr(
        'x',
        d => xScale(d.date) - (xRange[1] / xValues.length - (xRange[1] / xValues.length) * 0.3) / 2
      )
      .attr('width', xRange[1] / xValues.length - (xRange[1] / xValues.length) * 0.3)
      .attr('y', d => yScale(d.cases))
      .attr('height', d => yScale(0) - yScale(d.cases))
      .attr('rx', 'var(--inner-border-radius)')
      .attr('ry', 'var(--inner-border-radius)');
  });

  return <svg ref={ref}></svg>;
};
