const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function dateHour(dtime:number) {
  const d = new Date(dtime);
  switch (d.getHours()) {
    case 12:
      return (
        daysOfWeek[d.getDay()] + " " + (d.getMonth() + 1) + "/" + d.getDate()
      );
    default:
      return "";
  }
}
