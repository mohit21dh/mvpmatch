import { type FC } from 'react';
import Information from '../Icons/Information';
import Presentation from '../Icons/Presentation';
import Report from '../Icons/Report';
import Sections from '../Icons/Sections';
import Shutdown from '../Icons/Shutdown';

export const Sidebar: FC = () => {
  return (
    <aside
      id='default-sidebar'
      className='fixed top-16 left-0 z-40 w-16 h-screen transition-transform translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-white'>
        <ul className='space-y-2'>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <Information />
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <Sections />
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <Presentation />
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <Report />
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <Shutdown />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
