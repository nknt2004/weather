import { useEffect, useState } from "react";
import Chart from "./Chart";
import { getNextDate, getWeek, toDataset } from "./DataUtils";

export default function MyApp() {
  const [data, setData] = useState();

  async function fetchData() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=38.9822&longitude=-94.6708&hourly=temperature_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=14"
    );
    setData(await response.json());
  }

  useEffect(() => {
    fetchData();
  }, []);

  let dataset;
  let currentWeek, week2nd;
  if (data) {
    const { hourly } = data;
    const { time, temperature_2m, wind_speed_10m, weather_code } = hourly;
    dataset = toDataset(time, temperature_2m, wind_speed_10m, weather_code);

    currentWeek = getWeek(new Date(time[0]));
    // console.log(currentWeek[0].getTime(), currentWeek[6].getTime());

    week2nd = getWeek(getNextDate(currentWeek[6]));
    // console.log(week2nd[0].getTime(), week2nd[6].getTime());
  }

  if (!dataset) {
    return <div>Loading</div>;
  }
  const day_ms = 24 * 60 * 60 * 1000;

  return (
    <div>
      <Chart
        dataset={dataset}
        domain={[currentWeek[0]?.getTime(), currentWeek[6]?.getTime() + day_ms]}
      />

      <Chart
        dataset={dataset}
        domain={[week2nd[0]?.getTime(), week2nd[6]?.getTime() + day_ms]}
      />
    </div>
  );
}
