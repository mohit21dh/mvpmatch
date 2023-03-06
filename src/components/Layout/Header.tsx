import { type FC } from 'react';
import Hamburger from '../Icons/Hamburger';
import SiteLogo from '../Icons/SiteLogo';

const Header: FC = () => {
  return (
    <header
      aria-label='Site Header'
      className='bg-white sticky top-0 z-50 border-b-2 border-[#F3F6F9]'
    >
      <div className='flex items-center h-16 px-6'>
        <nav aria-label='Site Nav' className='w-full'>
          <ul className='flex items-center gap-6 h-full text-sm'>
            <li>
              <a href='/'>
                <SiteLogo />
              </a>
            </li>
            <li>
              <Hamburger />
            </li>
            <li className='ml-auto items-center inline-flex space-x-2'>
              <div className='flex flex-col justify-center h-12 w-12 text-lg bg-[#F6CA65] rounded-md text-white'>
                JD
              </div>
              <div className='text-[#005B96] font-bold text-md'>John Doe</div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
