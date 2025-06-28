import { useEffect, useState } from "react";
import Chart from "./Chart";
import { DatasetEntry, getNextDate, getWeek, toDataset } from "./DataUtils";
import sampleData from './SampleData.json';
import CurrentWeather from "./components/CurrentWeather";
import Weather24 from "./components/Weather24";
import { getWeather, WeatherInfo } from "./WeatherUtils";

export interface DailyWeather { [key: string]: { weather: WeatherInfo } }

export default function Weather({ lat, lon }: { lat: number; lon: number }) {
  const [data, setData] = useState<any>();

  async function fetchData() {
    const today = new Date();
    const pastDays = today.getDay();
    const forecastDays = 14 - pastDays;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code&hourly=temperature_2m,precipitation,wind_speed_10m&current=temperature_2m,apparent_temperature,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&past_days=${pastDays}&forecast_days=${forecastDays}`
    );
    setData(await response.json());
  }

  // function useSampleData() {
  //   setData(sampleData);
  // }

  useEffect(() => {
    fetchData();
    // useSampleData();
  }, []);

  let dataset: DatasetEntry[] | undefined = undefined;
  let currentWeek, week2nd;
  let dataset1, dataset2;
  let currentWeather;
  let next24hDataset: DatasetEntry[] = [];
  let dailyData: DailyWeather[] = [];

  if (data) {
    const { hourly, current, daily } = data;
    const { time, temperature_2m, wind_speed_10m, weather_code, precipitation } = hourly;

    dailyData = daily.time.map((dateStr, i) => {
      return {
        [dateStr]: {
          weather: getWeather(daily.weather_code[i]),
        }
      };
    })

    dataset = toDataset(time, temperature_2m, wind_speed_10m, weather_code, precipitation);
    currentWeek = getWeek(new Date(time[0]));
    week2nd = getWeek(getNextDate(currentWeek[6]));

    const now = new Date();
    now.setMinutes(0, 0, 0);
    const nowIndex = dataset.findIndex(d => d.time === now.getTime());
    next24hDataset = dataset.slice(nowIndex, nowIndex + 24);
    // console.log(next24hDataset)

    const week2ndIndex = dataset.findIndex(d => d.time === week2nd[0].getTime());
    dataset1 = dataset.slice(0, week2ndIndex);
    dataset2 = dataset.slice(week2ndIndex, week2ndIndex + 7 * 24);
    // console.log(week2nd[0].getTime(), week2nd[6].getTime());

    currentWeather = current;
  }

  if (dataset === undefined) {
    return <div>Loading</div>;
  }
  const day_ms = 24 * 60 * 60 * 1000;

  return (
    <div>
      <CurrentWeather temperature={currentWeather.temperature_2m} apparentTemperature={currentWeather.apparent_temperature} weatherCode={currentWeather.weather_code} />
      <Weather24 dataset={next24hDataset} domain={[next24hDataset[0].time, next24hDataset[23].time]} />

      <Chart
        dailyData={dailyData}
        dataset={dataset1}
        domain={[currentWeek[0]?.getTime(), currentWeek[6]?.getTime() + day_ms]}
      />

      <Chart
        dailyData={dailyData}
        dataset={dataset2}
        domain={[week2nd[0]?.getTime(), week2nd[6]?.getTime() + day_ms]}
      />
    </div>
  );
}
