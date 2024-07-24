import clsx from "clsx"
import gsap from "gsap"
import {useContext, useLayoutEffect, useRef, useState} from "react"

import {dataNav} from "@/data/dataNav"

import {Logo} from "@/shared/Logo/Logo"
import {FlyingParticles} from "@/shared/components/FlyingParticles"
import {scrollTo} from "@/shared/hooks/scrollTo"

import styles from "./Header.module.scss"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

export const Header = () => {
  const {menuActive, setMenuActive, refSwiper} = useContext(MainContext)

  const [active, setActive] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)
  const refButtonLaunch = useRef<HTMLButtonElement>(null)

  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
  const handleLink = (href?: string | null, section?: number) => {
    if (href) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, href, {
        swiper: refSwiper,
        section: section || 0,
      })
    } else if (section) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, null, {
        swiper: refSwiper,
        section: section,
      })
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth > 1024) {
        ScrollTrigger.create({
          trigger: "#hero",
          start: "top top+=25%",
          end: "bottom bottom-=50%",
          onLeave: () => ref.current?.classList.remove(`${styles.shared}`),
          onEnterBack: () => ref.current?.classList.add(`${styles.shared}`),
          onLeaveBack: () => ref.current?.classList.remove(`${styles.shared}`),
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={ref}
      className={clsx(styles.header, window.innerWidth > 1024 && styles.shared)}
    >
      <div
        className={clsx(
          styles.headerLogo,
          "reveal opacity-0 scale-[0.5]",
          menuActive && `${styles.hidden} opacity-0 pointer-events-none`,
        )}
      >
        <Logo />
      </div>
      {window.innerWidth <= 1024 && (
        <div
          className={clsx(
            styles.headerMobileButton,
            menuActive && styles.active,
          )}
        >
          <button
            className={clsx("btn", "primary-btn", styles.header_button_launch)}
            ref={refButtonLaunch}
            onClick={() =>
              (window.location.href = "https://app.ithacaprotocol.io/")
            }
          >
            <div className={clsx(styles.header_button_launch_FlyingParticles)}>
              <FlyingParticles element={refButtonLaunch} />
            </div>
            Launch app
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1667 5.83333L5.83337 14.1667M14.1667 5.83333H6.66671M14.1667 5.83333V13.3333"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div
        data-delay="0.5"
        className={clsx(
          styles.headerNav,
          active && styles.active,
          "reveal opacity-0 scale-[0.5]",
        )}
      >
        <div
          onClick={() => {
            setActive(true)
            if (window.innerWidth <= 1024) {
              menuActive ? setMenuActive(false) : setMenuActive(true)
            }
          }}
          className={clsx(styles.headerBurger, menuActive && styles.active)}
        >
          <svg
            width="26"
            height="8"
            viewBox="0 0 26 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L15 1.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M1 6.5L25 6.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1667 6.3333L5.83337 14.6666M14.1667 14.6665L5.83337 6.33325"
              stroke="#F9F9F9"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <ul className={styles.headerLinks}>
          {dataNav.map((link, idx) => (
            <li key={link.href}>
              <a
                style={{
                  transitionDelay: `${idx * 0.075 + 0.5}s`,
                }}
                onClick={() => {
                  if (link.href) {
                    handleLink(link.href)
                  } else if (link.section) {
                    handleLink(null, link.section)
                  }
                }}
                className={styles.headerLink}
              >
                {link.title}
              </a>
              <svg
                className={styles.gradient}
                width="200"
                height="90"
                viewBox="0 0 200 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_f_478_1048)">
                  <rect
                    x="30"
                    y="30"
                    width="140"
                    height="140"
                    rx="70"
                    fill="url(#paint0_linear_478_1048)"
                    fill-opacity="0.15"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_478_1048"
                    x="0"
                    y="0"
                    width="200"
                    height="200"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="15"
                      result="effect1_foregroundBlur_478_1048"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_478_1048"
                    x1="100"
                    y1="46.6667"
                    x2="101.377"
                    y2="83.8379"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#5EE192" stopOpacity="0" />
                    <stop offset="1" stopColor="#5EE192" />
                  </linearGradient>
                </defs>
              </svg>
            </li>
          ))}
        </ul>
        <button
          className={clsx("btn", "primary-btn", styles.header_button_launch)}
          ref={refButtonLaunch}
          onClick={() =>
            (window.location.href = "https://app.ithacaprotocol.io/")
          }
        >
          <div className={clsx(styles.header_button_launch_FlyingParticles)}>
            <FlyingParticles element={refButtonLaunch} />
          </div>
          Launch app
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1667 5.83333L5.83337 14.1667M14.1667 5.83333H6.66671M14.1667 5.83333V13.3333"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
