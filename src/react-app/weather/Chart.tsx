import React, {
  PureComponent,
  useState,
  useTransition,
  useEffect,
  ReactNode,
} from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
  ScatterChart,
  Scatter,
  LabelList,
  ComposedChart,
} from "recharts";
import { TempChart } from "./components/TempChart";
import { WindChart } from "./components/WindChart";
import { dateHour } from "./ChartUtils";
import { getWeather } from "./WeatherUtils";

const localData = {
  latitude: 38.97578,
  longitude: -94.6607,
  generationtime_ms: 0.05900859832763672,
  utc_offset_seconds: -21600,
  timezone: "America/Chicago",
  timezone_abbreviation: "CST",
  elevation: 333,
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°F",
    wind_speed_10m: "mp/h",
  },
  hourly: {
    time: [
      "2024-12-20T00:00",
      "2024-12-20T01:00",
      "2024-12-20T02:00",
      "2024-12-20T03:00",
      "2024-12-20T04:00",
      "2024-12-20T05:00",
      "2024-12-20T06:00",
      "2024-12-20T07:00",
      "2024-12-20T08:00",
      "2024-12-20T09:00",
      "2024-12-20T10:00",
      "2024-12-20T11:00",
      "2024-12-20T12:00",
      "2024-12-20T13:00",
      "2024-12-20T14:00",
      "2024-12-20T15:00",
      "2024-12-20T16:00",
      "2024-12-20T17:00",
      "2024-12-20T18:00",
      "2024-12-20T19:00",
      "2024-12-20T20:00",
      "2024-12-20T21:00",
      "2024-12-20T22:00",
      "2024-12-20T23:00",
      "2024-12-21T00:00",
      "2024-12-21T01:00",
      "2024-12-21T02:00",
      "2024-12-21T03:00",
      "2024-12-21T04:00",
      "2024-12-21T05:00",
      "2024-12-21T06:00",
      "2024-12-21T07:00",
      "2024-12-21T08:00",
      "2024-12-21T09:00",
      "2024-12-21T10:00",
      "2024-12-21T11:00",
      "2024-12-21T12:00",
      "2024-12-21T13:00",
      "2024-12-21T14:00",
      "2024-12-21T15:00",
      "2024-12-21T16:00",
      "2024-12-21T17:00",
      "2024-12-21T18:00",
      "2024-12-21T19:00",
      "2024-12-21T20:00",
      "2024-12-21T21:00",
      "2024-12-21T22:00",
      "2024-12-21T23:00",
      "2024-12-22T00:00",
      "2024-12-22T01:00",
      "2024-12-22T02:00",
      "2024-12-22T03:00",
      "2024-12-22T04:00",
      "2024-12-22T05:00",
      "2024-12-22T06:00",
      "2024-12-22T07:00",
      "2024-12-22T08:00",
      "2024-12-22T09:00",
      "2024-12-22T10:00",
      "2024-12-22T11:00",
      "2024-12-22T12:00",
      "2024-12-22T13:00",
      "2024-12-22T14:00",
      "2024-12-22T15:00",
      "2024-12-22T16:00",
      "2024-12-22T17:00",
      "2024-12-22T18:00",
      "2024-12-22T19:00",
      "2024-12-22T20:00",
      "2024-12-22T21:00",
      "2024-12-22T22:00",
      "2024-12-22T23:00",
      "2024-12-23T00:00",
      "2024-12-23T01:00",
      "2024-12-23T02:00",
      "2024-12-23T03:00",
      "2024-12-23T04:00",
      "2024-12-23T05:00",
      "2024-12-23T06:00",
      "2024-12-23T07:00",
      "2024-12-23T08:00",
      "2024-12-23T09:00",
      "2024-12-23T10:00",
      "2024-12-23T11:00",
      "2024-12-23T12:00",
      "2024-12-23T13:00",
      "2024-12-23T14:00",
      "2024-12-23T15:00",
      "2024-12-23T16:00",
      "2024-12-23T17:00",
      "2024-12-23T18:00",
      "2024-12-23T19:00",
      "2024-12-23T20:00",
      "2024-12-23T21:00",
      "2024-12-23T22:00",
      "2024-12-23T23:00",
      "2024-12-24T00:00",
      "2024-12-24T01:00",
      "2024-12-24T02:00",
      "2024-12-24T03:00",
      "2024-12-24T04:00",
      "2024-12-24T05:00",
      "2024-12-24T06:00",
      "2024-12-24T07:00",
      "2024-12-24T08:00",
      "2024-12-24T09:00",
      "2024-12-24T10:00",
      "2024-12-24T11:00",
      "2024-12-24T12:00",
      "2024-12-24T13:00",
      "2024-12-24T14:00",
      "2024-12-24T15:00",
      "2024-12-24T16:00",
      "2024-12-24T17:00",
      "2024-12-24T18:00",
      "2024-12-24T19:00",
      "2024-12-24T20:00",
      "2024-12-24T21:00",
      "2024-12-24T22:00",
      "2024-12-24T23:00",
      "2024-12-25T00:00",
      "2024-12-25T01:00",
      "2024-12-25T02:00",
      "2024-12-25T03:00",
      "2024-12-25T04:00",
      "2024-12-25T05:00",
      "2024-12-25T06:00",
      "2024-12-25T07:00",
      "2024-12-25T08:00",
      "2024-12-25T09:00",
      "2024-12-25T10:00",
      "2024-12-25T11:00",
      "2024-12-25T12:00",
      "2024-12-25T13:00",
      "2024-12-25T14:00",
      "2024-12-25T15:00",
      "2024-12-25T16:00",
      "2024-12-25T17:00",
      "2024-12-25T18:00",
      "2024-12-25T19:00",
      "2024-12-25T20:00",
      "2024-12-25T21:00",
      "2024-12-25T22:00",
      "2024-12-25T23:00",
      "2024-12-26T00:00",
      "2024-12-26T01:00",
      "2024-12-26T02:00",
      "2024-12-26T03:00",
      "2024-12-26T04:00",
      "2024-12-26T05:00",
      "2024-12-26T06:00",
      "2024-12-26T07:00",
      "2024-12-26T08:00",
      "2024-12-26T09:00",
      "2024-12-26T10:00",
      "2024-12-26T11:00",
      "2024-12-26T12:00",
      "2024-12-26T13:00",
      "2024-12-26T14:00",
      "2024-12-26T15:00",
      "2024-12-26T16:00",
      "2024-12-26T17:00",
      "2024-12-26T18:00",
      "2024-12-26T19:00",
      "2024-12-26T20:00",
      "2024-12-26T21:00",
      "2024-12-26T22:00",
      "2024-12-26T23:00",
    ],
    temperature_2m: [
      26.3, 24.2, 24.9, 24.3, 22.5, 22.2, 20.2, 19.5, 18.6, 19.1, 20.5, 23.1,
      25.9, 28, 29.6, 30.1, 29.6, 27.9, 23.9, 23.4, 22.6, 22.5, 21.9, 21.8,
      21.4, 20.7, 20.2, 19.5, 19, 18.3, 18.3, 18.1, 18.4, 22.5, 27.6, 31.1,
      33.6, 35.7, 37.3, 38.2, 38, 34.8, 31.9, 30.3, 26.9, 25.1, 24.3, 24.3, 24,
      24, 23.9, 23.9, 23.9, 24.1, 24.9, 31.5, 31.5, 34.7, 38.9, 42.9, 46.1,
      47.8, 49.3, 49.6, 48.5, 46.4, 45.2, 44.6, 43.9, 43.4, 44.7, 45.6, 46.1,
      45.8, 45.9, 46.6, 46.6, 46.3, 45.7, 45.5, 44.5, 45.2, 47.6, 49.6, 50.9,
      51.3, 51.8, 51.8, 50.7, 47.6, 46.1, 45.8, 45.2, 44.7, 44.3, 43.9, 43.6,
      43.1, 42.5, 42, 41.4, 41, 40.7, 39.7, 39.1, 39.8, 41.1, 42.9, 43.8, 43.3,
      42, 41.1, 40.2, 39.6, 39.2, 38.8, 38.6, 38.4, 38.3, 38, 37.9, 37.8, 37.8,
      37.8, 37.8, 37.8, 37.8, 37.9, 38.1, 38.3, 38.6, 39, 39.3, 39.7, 40.1,
      40.4, 40.4, 40.2, 40.1, 40.1, 40.3, 40.4, 40.6, 40.8, 41, 41.1, 41.4,
      41.6, 41.7, 41.7, 41.8, 41.9, 42, 42.7, 44.2, 46.2, 47.6, 48.1, 48, 47.7,
      47.3, 46.6, 46.1, 45.9, 45.9, 45.8, 45.5, 44.9,
    ],
    wind_speed_10m: [
      13.9, 14, 11.6, 11.1, 12.2, 11.8, 12.2, 10.9, 11.5, 12.7, 12.9, 12.9,
      11.7, 10, 8.9, 7.5, 7.4, 4.9, 4.9, 3.4, 3.3, 4.2, 4.6, 4.2, 3.5, 2.3, 2.2,
      4.5, 2.3, 3.4, 3.9, 3.7, 3.6, 4.8, 6.5, 5.8, 5.5, 4.5, 4.3, 4.5, 4.5, 4.4,
      4.9, 4.6, 5.7, 5.5, 4.5, 4.5, 4.9, 5, 4.9, 5.2, 5.4, 6.7, 7.6, 10.4, 10,
      11.7, 13.9, 15, 16.4, 16.2, 15.6, 15.3, 15.5, 15, 14.4, 14.3, 15.5, 16.3,
      16.2, 16, 15.3, 13.3, 11.9, 10.9, 10.6, 11.1, 10, 8.9, 7.4, 6.3, 6.1, 5.1,
      5, 5.1, 4.7, 4.2, 4.5, 4.2, 4.8, 4.8, 4.7, 4.6, 5.1, 4.8, 5.1, 5.5, 6.2,
      6.8, 7, 7.4, 7.6, 7.8, 8.1, 10.1, 10.7, 11.2, 10.7, 9.7, 9, 9.8, 9.7, 9.7,
      10, 10.8, 10.6, 10.6, 10.6, 9.6, 8.4, 7.7, 7.1, 6.7, 6.6, 6.8, 6.7, 6.4,
      6.1, 5.8, 5.1, 4.2, 3.9, 4.1, 4.6, 4.7, 4.6, 4.3, 4, 3.4, 2.5, 1.8, 1.4,
      1.1, 1.2, 0.6, 1.1, 1.9, 2.6, 3.5, 4.1, 4.3, 4.5, 4.3, 4.1, 3.8, 3.5, 3.2,
      4.4, 6.2, 7.4, 8.1, 8.1, 6.8, 5.3, 5, 5.6, 6.5,
    ],
  },
};

function Unit({ children }) {
  return <span className="unit">{children}</span>;
}

function TempTooltip({ active, payload }: {active?: boolean, payload?: any}) {
  if (!active || !payload?.length) {
    return;
  }

  const { time, temperature, weatherCode } = payload[0].payload;

  const datetime = new Date(time);
  const weather =
    weatherCode !== null ? getWeather(weatherCode, datetime.getHours()) : null;
  return (
    <CustomTooltip
      active={active}
      payload={payload}
      title={weatherCode !== null ? weather?.description : undefined}
      child2nd={
        <div>
          {weatherCode !== null && (
            <img
              src={weather?.image}
              width={50}
              height={50}
              style={{ margin: -5 }}
            />
          )}
        </div>
      }
    >
      <div className="label">
        {`Temp: ${temperature}`}
        <Unit>F</Unit>
      </div>
    </CustomTooltip>
  );
}

function WindTooltip({ active, payload }: {active?:boolean, payload?: any}) {
  if (!active || !payload?.length) {
    return;
  }

  const { wind } = payload[0].payload;
  // console.log(payload);

  return (
    <CustomTooltip active={active} payload={payload}>
      <div className="label">
        {`Wind: ${wind}`}
        <Unit>mph</Unit>
      </div>
    </CustomTooltip>
  );
}

interface CustomTooltipProps {
  active: boolean,
  payload: any,
  title?: string,
  children: ReactNode,
  child2nd?: ReactNode
}
const CustomTooltip = ({ active, payload, title, children, child2nd }:CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // console.log(payload);
    const { time } = payload[0].payload;
    const datetime = new Date(time);

    const hours = datetime.getHours() % 12;
    return (
      <div className="custom-tooltip">
        <div>
          <div>
            {hours === 0 ? 12 : hours}
            <Unit>{datetime.getHours() < 12 ? "AM" : "PM"}</Unit>
            {title}
          </div>
          {children}
        </div>
        {child2nd}
      </div>
    );
  }

  return null;
};

const ID = (Math.random() + 1).toString(36).substring(7);
export default function Chart({ id = ID, dataset, domain }) {
  return (
    <div style={{ margin: "1rem 0", width: "100%" }}>
      <ResponsiveContainer width={"100%"} height={160}>
        <TempChart dataset={dataset}>
          <Tooltip content={<TempTooltip />} />
          {XAxisTime(domain, true)}
          {CurrentTimeLine()}
          {DateLines()}
        </TempChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={140}>
        <WindChart syncID={id} dataset={dataset}>
          {/* <Tooltip labelFormatter={(v, n, p) => new Date(v).getHours()} /> */}
          <Tooltip content={<WindTooltip />} />
          {XAxisTime(domain)}
          {CurrentTimeLine()}
          {DateLines()}
        </WindChart>
      </ResponsiveContainer>
    </div>
  );
}

function XAxisTime(domain, hide = false) {
  return (
    <XAxis
      type={"number"}
      scale={"linear"}
      dataKey="time"
      interval={11}
      tickFormatter={dateHour}
      tick={{ fontSize: 14 }}
      domain={domain}
      allowDataOverflow={true}
      hide={hide}
      tickLine={false}
    />
  );
}

function CurrentTimeLine(x = new Date()) {
  return (
    <ReferenceLine
      x={x.getTime()}
      stroke="black"
      strokeWidth={2}
      strokeOpacity={0.3}
    >
      {/* <Label value="Now" angle={-90} position={"insideLeft"} offset={-10} /> */}
    </ReferenceLine>
  );
}

function DateLines() {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setMilliseconds(0);

  const lines:ReactNode[] = [];

  for (let i = 1; i < 14; i++) {
    lines.push(<ReferenceLine x={now.getTime() + i * 8.64e7} stroke="#555" />);
  }

  return lines;
}
