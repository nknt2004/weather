import { CustomTooltip, Unit } from "../Chart";
import { getWeather } from "../WeatherUtils";

export function TempTooltip({ active, payload }: { active?: boolean; payload?: any; }) {
  if (!active || !payload?.length) {
    return;
  }

  const { time, temperature, weatherCode, precipitation } = payload[0].payload;

  const datetime = new Date(time);
  const weather = weatherCode !== null ? getWeather(weatherCode, datetime.getHours()) : null;
  return (
    <CustomTooltip
      active={active}
      payload={payload}
      title={weatherCode !== null ? weather?.description : undefined}
    >
      <div className="label">
        {`Temp: ${temperature}`}
        <Unit>F</Unit>
      </div>
      {(precipitation > 0) &&
        <div className="label">
          {`Precipitation: ${precipitation}`}
          <Unit>in</Unit>
        </div>}
    </CustomTooltip>
  );
}
