import { ReactNode } from "react";
import {
  CartesianGrid,
  // LabelList,
  Line,
  LineChart,
  YAxis
} from "recharts";
import { Theme } from "../Theme";

interface WindChartProps {
  syncID?: string;
  dataset: any; // Ideally, replace `any` with a proper dataset type
  width?: number;
  height?: number;
  children?: ReactNode;
}

export function WindChart({ syncID, dataset, width, height, children }: WindChartProps) {
  return (
    <LineChart width={width} height={height} data={dataset} syncId={syncID}>
      <CartesianGrid stroke={Theme.gridStroke} strokeDasharray="3 3" />
      <YAxis
        width={25}
        allowDecimals={false}
        padding={{ top: 5, bottom: 5 }}
        domain={["auto", "auto"]}
        scale={"linear"}
        tick={{ fill: Theme.textSecondary }}
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
        {/* <LabelList
          dataKey={({ time, wind }) => {
            if (time > now.getTime() && time < now.getTime() + 4000000) {
              return wind;
            }
          }}
          position="top"
          fill="black"
          offset={10}
        /> */}
      </Line>
    </LineChart>
  );
}
