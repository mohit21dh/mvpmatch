import { type FC } from 'react';
import { PieChart as ReactMinimalPieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

export const PieChart: FC<{
  data: Array<{
    title: string;
    value: number;
    color: string;
  }>;
}> = ({ data }) => {
  console.log('data is', data);
  return (
    <ReactMinimalPieChart
      data={data}
      radius={pieChartDefaultProps.radius - 16}
      lineWidth={60}
      animate
      segmentsStyle={{ transition: 'stroke .3s', margin: '1rem', cursor: 'pointer' }}
    />
  );
};
