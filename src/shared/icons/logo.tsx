import {FC} from "react"

interface IIconLogo {
  className?: string
}

interface IIconLogo {}

export const IconLogo: FC<IIconLogo> = ({className}) => {
  return (
    <svg
      className={className}
      width="162"
      height="68"
      viewBox="0 0 162 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dd_1840_1643)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M75.9456 46.0432L93.451 53.6986L83.9876 16.0792L76.6564 43.4522L74.2808 52.2853L71.9149 61.0007L68.9844 59.98L83.9973 9.99414L97.9198 59.1163L75.9456 46.0432Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M133.526 46.0432L151.021 53.6986L141.558 16.0792L134.227 43.4522L131.851 52.2853L129.495 61.0007L126.555 59.98L141.577 9.99414L155.49 59.1163L133.526 46.0432Z"
          fill="white"
        />
        <path
          d="M120.947 56.3184L118.62 59.518L96.4023 32.9106L118.357 7L120.703 10.1603L100.238 32.8026L120.947 56.3184Z"
          fill="white"
        />
        <path
          d="M63.711 18.6904V60.4222H61.0336V40.8518H40.2472V60.4222H37.5698V18.6904H40.2472V38.1037H61.0336V18.6904H63.711Z"
          fill="white"
        />
        <path
          d="M63.6881 7.20801V9.9561H29.4174V60.4228H26.7399V9.9561H13.4795V7.20801H63.6881Z"
          fill="white"
        />
        <path d="M9.23582 7.15625H6.5V60.4202H9.23582V7.15625Z" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_dd_1840_1643"
          x="0.573175"
          y="1.07317"
          width="160.854"
          height="65.8537"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.96341" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.643137 0 0 0 0 0.956863 0 0 0 0 0.85098 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1840_1643"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.96341" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.643137 0 0 0 0 0.956863 0 0 0 0 0.85098 0 0 0 0.65 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1840_1643"
            result="effect2_dropShadow_1840_1643"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_1840_1643"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1840_1643">
          <rect
            width="149"
            height="54"
            fill="white"
            transform="translate(6.5 7)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}