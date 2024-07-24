import {FC} from "react"

interface IIconClose {}

export const IconClose: FC<IIconClose> = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1663 5.83404L5.83301 14.1673M14.1663 14.1673L5.83301 5.83398"
        stroke="#F9F9F9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
