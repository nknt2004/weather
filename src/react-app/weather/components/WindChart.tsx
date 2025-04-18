import { ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface WindChartProps {
  syncID?: string;
  dataset: any; // Ideally, replace `any` with a proper dataset type
  width?: number;
  height?: number;
  children?: ReactNode;
}

export function WindChart({ syncID, dataset, width, height, children }: WindChartProps) {
  const now = new Date();
  return (
    <LineChart width={width} height={height} data={dataset} syncId={syncID}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis
        width={25}
        allowDecimals={false}
        domain={["auto", "auto"]}
        scale={"linear"}
      />

      {children}
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey="wind"
        dot={false}
        stroke="#82ca9d"
        strokeWidth={2}
      >
        <LabelList
          dataKey={({ time, wind }) => {
            if (time > now.getTime() && time < now.getTime() + 4000000) {
              return wind;
            }
          }}
          position="top"
          fill="black"
          offset={10}
        />
      </Line>
    </LineChart>
  );
}
