import {
  ReactNode
} from "react";
import {
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { TempChart } from "./components/TempChart";
import { WindChart } from "./components/WindChart";
import { XAxisTime } from "./components/XAxisTime";
import { DateLines } from "./components/DateLines";
import { CurrentTimeLine } from "./components/CurrentTimeLine";
import { Precipitation } from "./components/Precipitation";
import { TempTooltip } from "./components/TempTooltip";

export function Unit({ children }: { children: ReactNode }) {
  return <span className="unit">{children}</span>;
}

function WindTooltip({ active, payload }: { active?: boolean, payload?: any }) {
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
export const CustomTooltip = ({ active, payload, title, children, child2nd }: CustomTooltipProps) => {
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

export default function Chart({ dataset, domain }) {
  const id = (Math.random() + 1).toString(36).substring(7);

  return (
    <div className="chart-container">
      <ResponsiveContainer width={"100%"} height={160}>
        <TempChart syncID={id} dataset={dataset}>
          <Tooltip cursor={false} content={<TempTooltip />} />
          {XAxisTime(domain)}
          {CurrentTimeLine()}
          {DateLines(dataset[0].time)}
          {...Precipitation()}
        </TempChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={80}>
        <WindChart syncID={id} dataset={dataset}>
          {/* <Tooltip labelFormatter={(v, n, p) => new Date(v).getHours()} /> */}
          <Tooltip content={<WindTooltip />} />
          {XAxisTime(domain, true)}
          {CurrentTimeLine()}
          {DateLines(dataset[0].time)}
        </WindChart>
      </ResponsiveContainer>
    </div>
  );
}


