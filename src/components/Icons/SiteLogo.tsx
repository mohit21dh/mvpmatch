import { type FC, type SVGProps } from 'react';

const SiteLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width={27} height={40} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M4.88 39.962V32.04l8.054.056c2.94.068 5.376-2.162 5.632-4.802.31-3.017-2.229-6.037-5.632-6.007l7.998-4.225c4.246 2.943 6.438 8.066 5.532 12.842-1.125 5.98-6.893 10.53-13.534 10.04l-8.05.017Z'
      fill='url(#a)'
    />
    <path d='M6.893 14.568H0v25.394h6.893V14.568Z' fill='url(#b)' />
    <path
      d='M0 0v6.857h13.116c.99 0 1.94.406 2.64 1.13a3.922 3.922 0 0 1 1.092 2.725 3.922 3.922 0 0 1-1.093 2.727c-.7.723-1.649 1.129-2.639 1.129H0v6.814h13.844c5.438-.23 9.804-4.601 10.197-9.847C24.454 5.775 20.02.427 14.047 0H0Z'
      fill='url(#c)'
    />
    <defs>
      <linearGradient
        id='a'
        x1={19.282}
        y1={20.596}
        x2={10.953}
        y2={43.426}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#00628B' />
        <stop offset={0.03} stopColor='#006792' />
        <stop offset={0.19} stopColor='#007BAF' />
        <stop offset={0.36} stopColor='#008BC6' />
        <stop offset={0.54} stopColor='#0096D6' />
        <stop offset={0.74} stopColor='#009DE0' />
        <stop offset={1} stopColor='#009FE3' />
      </linearGradient>
      <linearGradient
        id='b'
        x1={3.453}
        y1={16.349}
        x2={3.444}
        y2={29.439}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.47} stopColor='#00628B' />
        <stop offset={1} stopColor='#009FE3' />
      </linearGradient>
      <linearGradient
        id='c'
        x1={5.917}
        y1={4.05}
        x2={12.601}
        y2={14.902}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.28} stopColor='#00628B' />
        <stop offset={1} stopColor='#009FE3' />
      </linearGradient>
    </defs>
  </svg>
);

export default SiteLogo;
