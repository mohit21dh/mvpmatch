import { type FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className='ml-20 mt-auto my-4 text-[#005B96] font-bold flex space-x-2 z-50'>
      <a href='#'>Terms and Conditions</a>
      <div>|</div>
      <a href='#'>Policy</a>
    </footer>
  );
};
