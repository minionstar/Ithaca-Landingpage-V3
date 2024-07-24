import {FC} from "react"

interface IAccordionButton {
  index: number
}

export const AccordionButton: FC<IAccordionButton> = ({index}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="39.5"
        y="39.5"
        width="39"
        height="39"
        rx="19.5"
        transform="rotate(-180 39.5 39.5)"
        stroke={`url(#paint0_linear_832_27310_${index})`}
      />
      <path
        d="M24.1673 15.833L15.834 24.1663M24.1673 15.833H16.6673M24.1673 15.833V23.333"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_832_27310_${index}`}
          x1="42.5"
          y1="42"
          x2="78.5"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
