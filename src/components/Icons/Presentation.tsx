import { FC, SVGProps } from "react"

const Presentation: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.3}
      d="M18.67 22.22a2.39 2.39 0 0 1-2.23-1.6c0-.09 0-.18-.08-.18H8.44c0 .09 0 .18-.08.18a2.19 2.19 0 0 1-2.14 1.6.89.89 0 0 0 0 1.78h12.45a.89.89 0 0 0 0-1.78Z"
      fill="#000"
    />
    <path
      d="M14.22 11.56H16a.89.89 0 0 0 0-1.78h-1.78a.89.89 0 0 0 0 1.78Z"
      fill="#CDCCCC"
    />
    <path
      d="M22.22 0H2.67A2.63 2.63 0 0 0 0 2.67V16a2.63 2.63 0 0 0 2.67 2.67h19.55A2.631 2.631 0 0 0 24.89 16V2.67A2.631 2.631 0 0 0 22.22 0Zm-2.66 12.44a1.78 1.78 0 0 1-1.78 1.78H7.11a1.78 1.78 0 0 1-1.78-1.78V8.89h14.23v3.55Zm0-5.33H5.33v-.89a1.78 1.78 0 0 1 1.78-1.78h10.67a1.78 1.78 0 0 1 1.78 1.78v.89Z"
      fill="#CDCCCC"
    />
  </svg>
)

export default Presentation
