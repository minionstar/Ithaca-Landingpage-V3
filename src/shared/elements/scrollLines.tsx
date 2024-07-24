import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface IElementScrollLines {}

export const ElementScrollLines: FC<IElementScrollLines> = () => {
  return (
    <svg
      width="133"
      height="54"
      viewBox="0 0 133 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1889_10462)">
        <path
          d="M403 11H104.485C102.894 11 101.368 10.3679 100.243 9.24264L95.7574 4.75736C94.6321 3.63214 93.106 3 91.5147 3H0"
          stroke="url(#paint0_linear_1889_10462)"
          stroke-opacity="0.2"
        />
        <path
          d="M403 43H104.485C102.894 43 101.368 43.6321 100.243 44.7574L95.7574 49.2426C94.6321 50.3679 93.106 51 91.5147 51H0"
          stroke="url(#paint1_linear_1889_10462)"
          stroke-opacity="0.2"
        />
        <circle
          cx="3"
          cy="3"
          r="3"
          transform="matrix(-1 0 0 1 13.5 0)"
          fill="#010512"
        />
        <circle
          cx="3"
          cy="3"
          r="2.5"
          transform="matrix(-1 0 0 1 13.5 0)"
          stroke="white"
          stroke-opacity="0.4"
        />
        <circle
          cx="3"
          cy="3"
          r="3"
          transform="matrix(-1 0 0 1 13.5 48)"
          fill="#010512"
        />
        <circle
          cx="3"
          cy="3"
          r="2.5"
          transform="matrix(-1 0 0 1 13.5 48)"
          stroke="white"
          stroke-opacity="0.4"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1889_10462"
          x1="21.5"
          y1="7.5002"
          x2="364.5"
          y2="7.5002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.353125" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1889_10462"
          x1="21.5"
          y1="46.4998"
          x2="364.5"
          y2="46.4998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.347916" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_1889_10462">
          <rect width="133" height="54" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
