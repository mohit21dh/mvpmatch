import { type FC } from 'react';
import { PieChart as ReactMinimalPieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

export const PieChart: FC<{
  data: Array<{
    title: string;
    value: number;
    color: string;
  }>;
  className: string;
}> = ({ data, className }) => {
  return (
    <ReactMinimalPieChart
      className={className}
      data={data}
      radius={pieChartDefaultProps.radius - 16}
      lineWidth={60}
      animate
      label={({ dataEntry }) => `${dataEntry.value} %`}
      labelStyle={{
        fontSize: '3.5px',
        fill: 'white',
      }}
      lengthAngle={-360}
      paddingAngle={1}
      labelPosition={66}
      segmentsStyle={{
        strokeWidth: '10',
        transition: 'stroke .3s',
        margin: '1rem',
        cursor: 'pointer',
      }}
    />
  );
};
