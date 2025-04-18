import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  LabelList,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";
import { getWeather } from "../WeatherUtils";
import { ReactNode } from "react";

const now = new Date();
const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
  if (payload.weatherCode === null) {
    return;
  }
  const datetime = new Date(payload.time);

  return (
    <svg
      x={cx - 10}
      y={cy - 20}
      width={20}
      height={20}
      fill="green"
      viewBox="0 0 200 200"
    >
      <image
        href={getWeather(payload.weatherCode, datetime.getHours())?.image}
        height="200"
        width="200"
      />
    </svg>
  );
};

interface TempChartProps {
  syncID?: string;
  dataset: any; // Ideally, replace `any` with a proper dataset type
  width?: number;
  height?: number;
  children?: ReactNode;
}

export function TempChart({
  syncID,
  dataset,
  width = 1200,
  height = 250,
  children,
}: TempChartProps) {
  const now = new Date();
  return (
    <ComposedChart
      width={width}
      height={height}
      syncId={syncID}
      data={dataset}
      margin={{ top: 0, bottom: 0, left: 5, right: 5 }}
    >
      <defs>
        <linearGradient
          id="colorUv"
          gradientTransform="rotate(90)"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="30%" stopColor="#ffa500" />
          <stop offset="70%" stopColor="#0064db" />
        </linearGradient>
      </defs>

      <ReferenceArea
        id="refarea"
        y1={0}
        y2={120}
        ifOverflow="visible"
        fill="url(#colorUv)"
        mask="url(#line)"
        opacity={1}
      />

      <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
      {children}
      <YAxis
        allowDecimals={false}
        domain={["auto", "auto"]}
        padding={{ top: 20, bottom: 20 }}
        scale={"linear"}
        width={25}
      />
      <Line
        type="monotone"
        dataKey="temperature"
        dot={<CustomizedDot />}
        stroke="black"
        strokeWidth={2}
        isAnimationActive={false}
      >
        <LabelList
          dataKey={({ time, temperature }) => {
            if (time > now.getTime() && time < now.getTime() + 4000000) {
              return temperature;
            }
          }}
          position="top"
          fill="black"
          offset={10}
        />
      </Line>

      {/* <Scatter dataKey="temperature" fill="#8884d8">
        <LabelList /> 
      </Scatter> */}
    </ComposedChart>
  );
}
