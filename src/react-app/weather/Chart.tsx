import {
  ReactNode
} from "react";
import {
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import { dateHour } from "./ChartUtils";
import { TempChart } from "./components/TempChart";
import { WindChart } from "./components/WindChart";
import { getWeather } from "./WeatherUtils";

function Unit({ children }:{children: ReactNode}) {
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

export default function Chart({ dataset, domain }) {
  const id = (Math.random() + 1).toString(36).substring(7);
  return (
    <div style={{ margin: "1rem 0", width: "100%" }}>
      <ResponsiveContainer width={"100%"} height={160}>
        <TempChart syncID={id} dataset={dataset}>
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
