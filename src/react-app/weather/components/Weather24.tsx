import React from 'react';
import { ResponsiveContainer, Tooltip } from 'recharts';
import { TempChart } from './TempChart';
import { TempTooltip } from './TempTooltip';
import { Precipitation } from './Precipitation';
import { DateLines } from './DateLines';
import { XAxisTime } from './XAxisTime';
import { DatasetEntry } from '../DataUtils';
import { AxisDomain } from "recharts/types/util/types";

interface Weather24Props {
  domain: AxisDomain;
  dataset: DatasetEntry[];
}

export default function Weather24({ domain, dataset }: Weather24Props) {
  return (
    <ResponsiveContainer width={"100%"} height={120}>
      <TempChart dataset={dataset}>
        <Tooltip cursor={false} content={<TempTooltip />} />
        {XAxisTime({ domain, hide: false, isHour: true, orientation: "bottom" })}
        {DateLines(dataset[0].time)}
        {...Precipitation()}
      </TempChart>
    </ResponsiveContainer>
  );
}