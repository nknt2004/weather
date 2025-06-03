const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function dayDate(dtime:number) {
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

export function hour(dtime:number) {
  const d = new Date(dtime);
  return d.getHours()+"";
}