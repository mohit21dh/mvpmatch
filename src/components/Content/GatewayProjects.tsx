import { type FC } from 'react';
import { projectColors } from '../../helpers/colors';
import { formatCurrency } from '../../helpers/currency';
import { PieChart } from '../PieChart.tsx';

export const GatewayProjects: FC<{
  gatewayProjects: Array<{
    value: string;
    amount: number;
  }>;
  idMapCb: (val: any) => string;
  idMap: Record<string, Record<string, any>>;
  gatewayProjectSum: number;
  totalPrefixText: string;
}> = ({ gatewayProjects, gatewayProjectSum, idMap, idMapCb, totalPrefixText }) => {
  return (
    <div className='w-[45vw] row-span-2 bg-white'>
      <>
        <div className='flex p-4 rounded-lg items-center gap-4 h-16 bg-[#F1FAFE]'>
          {gatewayProjects?.map((prj, index) => {
            return (
              <>
                <p
                  className={`w-4 h-4 rounded`}
                  style={{
                    backgroundColor: projectColors[index],
                  }}
                />
                <div>{idMapCb(idMap[prj.value])}</div>
              </>
            );
          })}
        </div>
        <div className='flex rounded-md'>
          <PieChart
            className='h-80 w-full'
            data={gatewayProjects?.map((val, index) => {
              return {
                title: val.value,
                value: Math.floor((val.amount / gatewayProjectSum) * 100),
                color: projectColors[index],
              };
            })}
          />
        </div>
        <div className='flex p-4 mt-4 rounded-lg items-center gap-4 h-16 bg-[#F1FAFE]'>
          <div className='font-extrabold flex gap-2'>
            {totalPrefixText} Total | {formatCurrency(gatewayProjectSum)}
          </div>
        </div>
      </>
    </div>
  );
};
