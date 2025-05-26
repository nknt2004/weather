import { XAxis } from "recharts";
import { dateHour, hour } from "../ChartUtils";
import { Theme } from "../Theme";
import { AxisDomain } from "recharts/types/util/types";

export function XAxisTime(domain: AxisDomain, hide = false, isHour = false, orientation: "top" | "bottom" = "top") {
  return (
    <XAxis
      orientation={orientation}
      type={"number"}
      scale={"linear"}
      dataKey="time"
      interval={isHour ? 0 : 11}
      tickFormatter={isHour ? hour : dateHour}
      tick={{ fontSize: "0.9em", fill: Theme.textPrimary }}
      domain={domain}
      // allowDataOverflow={true}
      hide={hide}
      tickLine={false}
      stroke="0" />
  );
}
