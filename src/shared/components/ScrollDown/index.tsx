import {useGSAP} from "@gsap/react"
import anime from "animejs"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useContext, useEffect, useRef, useState} from "react"

import {ElementScrollLines} from "@/shared/elements/scrollLines"
import {IconArrowScroll} from "@/shared/icons/arrow-scroll"

import styles from "./index.module.scss"
import {MainContext} from "@/app/providers/MainContext"

interface IScrollDown {}

export const ScrollDown: FC<IScrollDown> = () => {
  const {scrollDownPos} = useContext(MainContext)

  const [isActive, setActive] = useState<boolean>(false)

  const refArrows = useRef<HTMLDivElement[] | null[]>([])
  const refTitle = useRef<HTMLDivElement>(null)
  const refContent = useRef<HTMLDivElement>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const tl1 = useRef<gsap.core.Timeline>()
  const tl2 = useRef<gsap.core.Timeline>()
  const tlSvg = useRef<anime.AnimeParams>()

  useGSAP(() => {
    if (tlSvg.current) {
      tlSvg.current = anime.timeline({
        direction: "alternate",
        duration: 500,
        easing: "easeInOutSine",
      })

      tlSvg.current
        .add({
          targets: "#svg_scroll path",
          strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
          targets: "#svg_scroll circle",
          strokeDashoffset: [anime.setDashoffset, 0],
        })
    }
    //Arrows
    tl1.current = gsap
      .timeline({
        defaults: {
          delay: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
      })
      .to(
        refArrows.current[0],
        {
          opacity: 1,
          scale: 1.2,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.60))",
        },
        "<60%",
      )
      .to(
        refArrows.current[1],
        {
          opacity: 1,
          scale: 1.2,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.60))",
        },
        "<60%",
      )
      .to(
        refArrows.current[2],
        {
          opacity: 1,
          scale: 1.2,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.60))",
        },
        "<60%",
      )
      .to(
        refArrows.current[0],
        {
          opacity: 0.3,
          scale: 1,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.0))",
        },
        "<60%",
      )
      .to(
        refArrows.current[1],
        {
          opacity: 0.3,
          scale: 1,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.0))",
        },
        "<60%",
      )
      .to(
        refArrows.current[2],
        {
          opacity: 0.3,
          scale: 1,
          filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.0))",
        },
        "<60%",
      )
      .repeat(-1)
    // .repeatDelay(0.2)

    tl2.current = gsap
      .timeline({
        defaults: {
          delay: 0,
          duration: 2,
          ease: "power1.inOut",
        },
      })
      .to(refTitle.current, {
        opacity: 0,
      })
      .to(refTitle.current, {
        opacity: 1,
      })
      .repeat(-1)
  }, [])

  useEffect(() => {
    if (isActive) {
      gsap.to(refRoot.current, {
        opacity: 1,
      })
      anime({
        targets: `#svg_scroll path`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "cubicBezier(.5, .05, .1, .3)",
        duration: 1000,
        delay: function (el, i) {
          return i * 200
        },
      })
      anime({
        targets: `#svg_scroll circle`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "cubicBezier(.5, .05, .1, .3)",
        duration: 1000,
        delay: function (el, i) {
          return i * 200
        },
      })

      setTimeout(() => {
        gsap.to(refContent.current, {
          opacity: 1,
          duration: 5,
        })
      }, 1500)
    } else {
      gsap.to(refContent.current, {
        opacity: 0,
      })
      gsap.to(refRoot.current, {
        opacity: 0,
      })
      if (tlSvg.current) tlSvg.current.reverse
    }
  }, [isActive])

  let scrollTimer: any

  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer)
    setActive(false)

    scrollTimer = setTimeout(() => {
      setActive(true)
    }, 2000)
  })

  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    }, 8000)
  }, [])

  return (
    <div
      className={clsx(styles.ScrollDown, styles[scrollDownPos])}
      ref={refRoot}
      onClick={() => console.log("dddd")}
    >
      <div className={clsx(styles.ScrollDown_lines)}>
        {/* <ElementScrollLines /> */}
        <svg
          id="svg_scroll"
          width="133"
          height="54"
          viewBox="0 0 133 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1889_10462)">
            <path
              d="M403 11H104.485C102.894 11 101.368 10.3679 100.243 9.24264L95.7574 4.75736C94.6321 3.63214 93.106 3 91.5147 3H0"
              stroke="url(#paint0_linear_1889_10462)"
              strokeOpacity="0.2"
            />
            <path
              d="M403 43H104.485C102.894 43 101.368 43.6321 100.243 44.7574L95.7574 49.2426C94.6321 50.3679 93.106 51 91.5147 51H0"
              stroke="url(#paint1_linear_1889_10462)"
              strokeOpacity="0.2"
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
              strokeOpacity="0.4"
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
              strokeOpacity="0.4"
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
              <stop stopColor="white" />
              <stop offset="0.353125" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1889_10462"
              x1="21.5"
              y1="46.4998"
              x2="364.5"
              y2="46.4998"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="0.347916" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_1889_10462">
              <rect width="133" height="54" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={clsx(styles.ScrollDown_content)} ref={refContent}>
        <div className={clsx(styles.ScrollDown_arrows)}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                className={clsx(styles.ScrollDown_arrows_item)}
                ref={(ref) => (refArrows.current[i] = ref)}
                key={i}
              >
                <IconArrowScroll />
              </div>
            ))}
        </div>
        <div className={clsx(styles.ScrollDown_title)} ref={refTitle}>
          Scroll Down
        </div>
      </div>
    </div>
  )
}
