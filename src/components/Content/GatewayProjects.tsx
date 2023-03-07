import { type FC } from 'react';
import { projectColors } from '../../helpers/colors';
import { formatCurrency } from '../../helpers/currency';
import { PieChart } from '../PieChart.tsx';

export const GatewayProjects: FC<{
  gatewayProjects: Array<{
    value: string;
    amount: number;
  }>;
  idMapKey: string;
  idMap: Record<string, Record<string, string>>;
  gatewayProjectSum: number;
  totalPrefixText: string;
}> = ({ gatewayProjects, gatewayProjectSum, idMap, idMapKey, totalPrefixText }) => {
  console.log('proj are', gatewayProjects, idMap);
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
                <div>{idMap?.[prj.value]?.[idMapKey]}</div>
              </>
            );
          })}
        </div>
        <div className='flex rounded-md'>
          <PieChart
            data={gatewayProjects?.map((val, index) => {
              return {
                title: val.value,
                value: Math.floor((val.amount / gatewayProjectSum) * 100),
                color: projectColors[index],
              };
            })}
          />
        </div>
        <div className='flex p-4 mt-8 rounded-lg items-center gap-4 h-16 bg-[#F1FAFE]'>
          <div className='font-extrabold flex gap-2'>
            {totalPrefixText} Total | {formatCurrency(gatewayProjectSum)}
          </div>
        </div>
      </>
    </div>
  );
};
