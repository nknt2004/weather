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
import { toISODate } from "./DataUtils";
import { WeatherInfo } from "./WeatherUtils";
import { DailyWeather } from "./Weather";
import { Theme } from "./Theme";
import { dayDate } from "./ChartUtils";

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

function WeatherDateTick(dailyData: DailyWeather[] | undefined, tickProp) {
  const { x, y, payload } = tickProp;
  const date = new Date(payload.value);
  if (date.getHours() !== 12) {
    return null; // Only show ticks for 12:00 PM
  }

  const dayDateStr = dayDate(payload.value);

  if (!dailyData || !dailyData.length) {
    return dayDateStr;
  }

  const dateKey = toISODate(date);
  const weather = dailyData?.find((d) => d[dateKey])?.[dateKey]?.weather;
  if (weather) {
    return <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        // dy={16} // Offset to position text below the image
        textAnchor="middle"
        fill={Theme.textPrimary}
        fontSize={12}
      >
        {dayDateStr}
      </text>
      <image
        href={weather.image}
        x={-16} // Center the image horizontally (half of width)
        y={-38} // Position above the text
        textAnchor="middle"
        width="32"
        height="32"
      />

    </g>;
  }

  return dayDateStr
}

interface ChartProps {
  dataset: any[];
  domain: any;
  dailyData?: DailyWeather[];
}

export default function Chart({ dataset, domain, dailyData }: ChartProps) {
  const id = (Math.random() + 1).toString(36).substring(7);

  return (
    <div className="chart-container">
      <ResponsiveContainer width={"100%"} height={160}>
        <TempChart syncID={id} dataset={dataset} top={15}>
          <Tooltip cursor={false} content={<TempTooltip />} />
          {XAxisTime({ domain, CustomTick: (tickProp) => WeatherDateTick(dailyData, tickProp) })}
          {CurrentTimeLine()}
          {DateLines(dataset[0].time)}
          {...Precipitation()}
        </TempChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={80}>
        <WindChart syncID={id} dataset={dataset}>
          {/* <Tooltip labelFormatter={(v, n, p) => new Date(v).getHours()} /> */}
          <Tooltip content={<WindTooltip />} />
          {XAxisTime({ domain, hide: true })}
          {CurrentTimeLine()}
          {DateLines(dataset[0].time)}
        </WindChart>
      </ResponsiveContainer>
    </div>
  );
}


