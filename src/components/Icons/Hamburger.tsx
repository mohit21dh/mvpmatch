import { FC, SVGProps } from "react"


const Hamburger: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={31}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 1.929A1.929 1.929 0 0 1 1.929 0h27a1.929 1.929 0 0 1 0 3.857h-27A1.929 1.929 0 0 1 0 1.93ZM0 25.071a1.929 1.929 0 0 1 1.929-1.928h27a1.928 1.928 0 1 1 0 3.857h-27A1.929 1.929 0 0 1 0 25.071ZM1.929 11.571a1.929 1.929 0 0 0 0 3.858h15.428a1.928 1.928 0 1 0 0-3.858H1.93Z"
      fill="#005B96"
    />
  </svg>
)

export default Hamburger;
