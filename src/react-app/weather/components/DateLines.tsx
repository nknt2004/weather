import { ReactNode } from "react";
import { ReferenceLine } from "recharts";
import { Theme } from "../Theme";

export function DateLines(firstDateTime) {
  const now = new Date(firstDateTime);
  now.setHours(0);
  now.setMinutes(0);
  now.setMilliseconds(0);

  const lines: ReactNode[] = [];

  for (let i = 1; i < 7; i++) {
    lines.push(<ReferenceLine x={now.getTime() + i * 8.64e7} stroke={Theme.gridDayStroke} />);
  }

  return lines;
}
