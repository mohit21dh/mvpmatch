import { FC, SVGProps } from "react"

const Report: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24.882 13.21h-12.11l-8.56 8.56a12.46 12.46 0 0 0 20.67-8.56ZM3.112 20.66A12.45 12.45 0 0 1 11.672 0v12.11l-8.56 8.56v-.01Z"
      fill="#2DAEE5"
    />
    <path
      d="M13.232 0v11.65h11.65A12.44 12.44 0 0 0 13.232 0Z"
      fill="#005B97"
    />
  </svg>
)

export default Report
