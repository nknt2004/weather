import { ReferenceLine } from "recharts";

export function CurrentTimeLine(x = new Date()) {
  return (
    <ReferenceLine
      x={x.getTime()}
      stroke="white"
      strokeWidth={2}
    >
      {/* <Label value="Now" angle={-90} position={"insideLeft"} offset={-10} /> */}
    </ReferenceLine>
  );
}
