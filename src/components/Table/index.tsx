import { type FC, type ReactNode } from 'react';

export const Table: FC<{
  headers: ReactNode[];
  rows: Array<{
    cols: ReactNode[];
  }>;
}> = ({ headers, rows }) => {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {headers?.map((header, headerIndex) => (
              <th scope='col' key={headerIndex} className='px-6 py-3'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {row.cols.map((col, colIndex) => (
                <th
                  scope='row'
                  key={`${rowIndex}_${colIndex}`}
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {col}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
