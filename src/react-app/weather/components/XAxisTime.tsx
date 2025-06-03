import { XAxis } from "recharts";
import { dayDate, hour } from "../ChartUtils";
import { Theme } from "../Theme";
import { AxisDomain } from "recharts/types/util/types";
import React, { JSX } from "react";

interface XAxisTimeProps {
  domain: AxisDomain;
  hide?: boolean;
  isHour?: boolean;
  orientation?: "top" | "bottom";
  // formatter?: (value: number) => string | React.ReactNode;
  CustomTick?: JSX.ElementType;
}

export function XAxisTime({ domain, hide = false, isHour = false, orientation = "top", CustomTick }: XAxisTimeProps) {
  return (
    <XAxis
      orientation={orientation}
      type={"number"}
      scale={"linear"}
      dataKey="time"
      interval={isHour ? 0 : 11}
      tickFormatter={isHour ? hour : dayDate}
      tick={CustomTick ? <CustomTick /> : { fontSize: "0.9em", fill: Theme.textPrimary }}
      domain={domain}
      // allowDataOverflow={true}
      hide={hide}
      tickLine={false}
      stroke="0" />
  );
}
