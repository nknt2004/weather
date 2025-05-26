import { YAxis, Bar } from "recharts";

export function Precipitation() {
  return [
    <YAxis
      yAxisId="histogram"
      label={{ value: 'precipitation', angle: -90, position: 'insideLeft' }}
      // stroke="#8884d8"
      domain={[0, 0.3]}
      reversed
      hide={true} />,
    <Bar barSize="100%" yAxisId="histogram" dataKey="precipitation" fill="#ac83e9" isAnimationActive={false} />
  ];
}
