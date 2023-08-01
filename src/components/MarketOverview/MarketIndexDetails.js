import React from 'react';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import styles from './MarketOverview.module.css';

const getIntroOfPage = (label, temp) => {
  const s = new Date(temp[label].amt).toLocaleDateString('en-US');
  return s;
};

const CustomTooltip = ({ active, payload, label, temp, constant }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: 'transparent' }}
      >
        <p className={`label ${styles.tooltipContainer}`}>
          <div className={styles.tooltipDate}>
            <div className={styles.tooltipDate}>
              {`${getIntroOfPage(label, temp)}`}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className={styles.tooltipPriceContainer}>
              <div className={styles.tooltipPrice}>Price: </div>
              <div>${temp[label].pv}</div>
            </div>
          </div>
        </p>
      </div>
    );
  }
  return null;
};

function MarketIndexDetails({
  name,
  tag,
  value,
  change,
  temp,
  day,
  diff,
  constant,
}) {
  const [color, setColor] = useState([]);

  useEffect(() => {
    if (temp.slice(-1)[0].pv < temp[0].pv) {
      setColor('rgba(184,44,44,255)'); // Red Original: (185, 6, 6)
    } else {
      setColor('rgb(49,209,158)'); // Green Original: (4, 104, 4)
    }
  }, [setColor, temp]);

  useEffect(() => {
    console.log(name, tag);
  });

  return (
    <div>
      <div>
        <div class="row-lg-12">
          <label
            className={styles.marketIndex__value}
            style={{
              marginRight: '15px',
              marginLeft: '15px',
              maxWidth: '450px',
            }}
          >
            {tag}
            <font size=".5">{value}</font>
            {/* <font size="1">USD</font> */}
          </label>
        </div>
        <div class="row-lg-12">
          <label
            className={styles.marketIndex__name}
            style={{
              marginRight: '15px',
              marginLeft: '15px',
              maxWidth: '450px',
            }}
          >
            {name}
            <font
              size=".5"
              className={
                diff > 0 ? styles.marketIndex__green : styles.marketIndex__red
              }
              style={{ fontSize: 'calc(0.4rem + 0.vw)' }}
            >
              {diff < 0 ? '' + diff : '+' + diff} ({change} %)
            </font>
          </label>
        </div>
        <div className={styles.chartContainer}>
          {constant > 6 ? (
            <ResponsiveContainer maxWidth={450} height={75}>
              <LineChart
                style={{ backgroundColor: 'transparent' }}
                data={temp}
                margin={{ top: 10, right: 5, left: -50, bottom: 5 }}
                maxWidth={450}
                height={75}
              >
                <YAxis
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  axisLine={false}
                  tick={false}
                />
                <Tooltip
                  wrapperStyle={{
                    fontFamily: 'Roboto, sans-serif',
                    background: 'white',
                    color: 'black',
                    width: 'fit-content',
                    position: 'relative',
                    top: '-60px',
                    borderRadius: '5px',
                  }}
                  content={<CustomTooltip temp={temp} constant={constant} />}
                />
                <Line
                  strokeWidth={3}
                  type="monotone"
                  dataKey="pv"
                  stroke={color}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer maxWidth={450} height={150}>
              <AreaChart
                data={temp}
                margin={{ top: 10, right: 5, left: -50, bottom: 5 }}
                maxWidth={450}
                height={150}
              >
                <YAxis
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  axisLine={false}
                  tick={false}
                />
                <Tooltip
                  wrapperStyle={{
                    fontFamily: 'Roboto, sans-serif',
                    background: 'white',
                    color: 'black',
                    width: 'fit-content',
                    position: 'relative',
                    top: '-175px',
                    borderRadius: '5px',
                  }}
                  content={<CustomTooltip temp={temp} constant={constant} />}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="pv"
                  strokeWidth={2}
                  stroke={color}
                  fillOpacity={0.65}
                  fill={color}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketIndexDetails;
