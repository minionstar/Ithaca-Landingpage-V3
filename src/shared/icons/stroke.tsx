import {FC} from "react"

interface IIconStroke {}

export const IconStroke: FC<IIconStroke> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="10"
      viewBox="0 0 32 10"
      fill="none"
    >
      <mask
        id="mask0_1139_1097"
        style={{maskType: "alpha"}}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="10"
      >
        <rect
          x="32"
          y="10"
          width="32"
          height="10"
          transform="rotate(180 32 10)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1139_1097)">
        <path
          d="M39.5 10L42 10L30.5 -0.499999L27.5 -0.499999L39.5 10Z"
          fill="white"
          fillOpacity="0.3"
        />
        <path
          d="M28.5 10L31 10L19.5 -0.499999L16.5 -0.499999L28.5 10Z"
          fill="white"
          fillOpacity="0.5"
        />
        <path
          d="M34 10L36.5 10L25 -0.499999L22 -0.499999L34 10Z"
          fill="white"
          fillOpacity="0.4"
        />
        <path
          d="M23 10L25.5 10L14 -0.499999L11 -0.499999L23 10Z"
          fill="white"
          fillOpacity="0.6"
        />
        <path
          d="M17.5 10L20 10L8.5 -0.499999L5.5 -0.499999L17.5 10Z"
          fill="white"
          fillOpacity="0.7"
        />
        <path
          d="M12 10L14.5 10L3 -0.499999L-9.17939e-07 -0.499999L12 10Z"
          fill="white"
          fillOpacity="0.8"
        />
        <path
          d="M6.5 10L9 10L-2.5 -0.499999L-5.5 -0.499999L6.5 10Z"
          fill="white"
        />
        <path d="M1 10L3.5 10L-8 -0.499999L-11 -0.499999L1 10Z" fill="white" />
      </g>
    </svg>
  )
}
