import { getWeather } from "./WeatherUtils";

export function toDataset(times, temperatures, winds, weatherCode) {
  return times.map((t, i) => {
    const datetime = new Date(t);
    return {
      time: datetime.getTime(),
      temperature: temperatures[i],
      wind: winds[i],
      weatherCode:
        getWeather(weatherCode[i], datetime.getHours())?.image !=
        getWeather(weatherCode[i - 1], datetime.getHours())?.image
          ? weatherCode[i]
          : null,
    };
  });
}

export function getWeek(date) {
  const currentDay = date.getDay(); // Day of the week (0-6, Sunday to Saturday)
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - currentDay); // Set to Sunday of the current week

  const weekArray:Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(firstDayOfWeek);
    nextDay.setDate(firstDayOfWeek.getDate() + i);
    weekArray.push(nextDay);
  }
  return weekArray;
}

export function getNextDate(today) {
  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}
