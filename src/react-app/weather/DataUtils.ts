export interface DatasetEntry {
  time: number;
  temperature: number;
  wind: number;
  precipitation: number;
}

export function toDataset(
  times: string[],
  temperatures: number[],
  winds: number[],
  weatherCode: number[],
  precipitation: number[]
): DatasetEntry[] {
  return times.map((t, i) => {
    const datetime = new Date(t);
    return {
      time: datetime.getTime(),
      temperature: temperatures[i],
      wind: winds[i],
      precipitation: precipitation[i],
    };
  });
}

export function getWeek(date: Date): Date[] {
  const currentDay = date.getDay(); // Day of the week (0-6, Sunday to Saturday)
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - currentDay); // Set to Sunday of the current week

  const weekArray: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(firstDayOfWeek);
    nextDay.setDate(firstDayOfWeek.getDate() + i);
    weekArray.push(nextDay);
  }
  return weekArray;
}

export function getNextDate(today: Date): Date {
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

export function toISODate(date: Date): string {
  if(!date) return "";
  console.log(date);
  return date.toISOString().split("T")[0];
}