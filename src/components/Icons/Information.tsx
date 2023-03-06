import { type FC, type SVGProps } from 'react';

const Information: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M21.32 0H2.68A2.68 2.68 0 0 0 0 2.68v18.64C0 22.8 1.2 24 2.68 24h18.64C22.8 24 24 22.8 24 21.32V2.68C24 1.2 22.8 0 21.32 0Z'
      fill='#CDCCCC'
    />
    <path
      d='M12.82 10.5h-1.65c-.37 0-.67.3-.67.67v9.16c0 .37.3.67.67.67h1.65c.37 0 .67-.3.67-.67v-9.16c0-.37-.3-.67-.67-.67Z'
      fill='#fff'
    />
    <path
      d='M6.83 16.5H5.18c-.37 0-.67.3-.67.67v3.16c0 .37.3.67.67.67h1.65c.37 0 .67-.3.67-.67v-3.16c0-.37-.3-.67-.67-.67ZM18.83 3h-1.65c-.37 0-.67.3-.67.67v16.66c0 .37.3.67.67.67h1.65c.37 0 .67-.3.67-.67V3.67c0-.37-.3-.67-.67-.67Z'
      fill='#B3B3B3'
    />
  </svg>
);

export default Information;
