/* eslint-disable no-empty-pattern */
import clsx from "clsx"
import gsap from "gsap"
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef} from "react"

import {FlyingParticles} from "@/shared/components/FlyingParticles"
import {IconLogo} from "@/shared/icons/logo"

import styles from "./Hero.module.scss"

const Hero = forwardRef(({}, outerRef) => {
  const ref = useRef<HTMLElement>(null)
  const refButtonLaunch = useRef<HTMLButtonElement>(null)

  const shadow = useRef<HTMLDivElement>(null)

  useImperativeHandle(outerRef, () => ref.current)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const splitText =
        document.querySelectorAll<HTMLElement>(".hero-split-text")

      if (splitText) {
        splitText.forEach((el) => {
          const split = new SplitText(el, {
            type: el.dataset.type ?? "chars",
          })

          if (el.classList.contains("split-text-reveal")) {
            ScrollTrigger.create({
              trigger: el,
              start: el.dataset.start ?? "top top+=100%",
              onEnter: () =>
                gsap.to(split.chars, {
                  duration: 0.95,
                  delay: function (index) {
                    return index * 0.0025 + 1
                  },
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  stagger: 0.01,
                }),
            })
          }

          ScrollTrigger.create({
            trigger: "#hero",
            start: "top top+=15%",
            end: "bottom bottom-=55%",
            scrub: 1,
            animation: gsap.fromTo(
              split.chars,
              {
                pointerEvents: "auto",
              },
              {
                duration: 0.95,
                delay: function (index) {
                  return index * 0.0025 + 1
                },
                opacity: 0,
                scale: 0.25,
                rotateX: 75,
                translateZ: (window.innerWidth / 100) * 10 * -1,
                stagger: 0.01,
                pointerEvents: "none",
              },
            ),
          })
        })
      }

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top-=5%",
        end: "bottom bottom-=15%",
        scrub: 1,
        animation: gsap.to(shadow.current, {
          opacity: 0,
        }),
      })

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top-=5%",
        end: "bottom bottom-=25%",
        scrub: 1,
        animation: gsap.fromTo(
          "#hero .hero-hide",
          {
            pointerEvents: "auto",
          },
          {
            duration: 0.55,
            opacity: 0,
            scale: 0.5,
            pointerEvents: "none",
          },
        ),
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={ref} className={clsx("section", styles.hero)}>
      <div ref={shadow} className="bottom-shadow"></div>
      <div className={clsx(styles.heroBlurBox)}>
        <img
          data-delay="0.5"
          className={clsx(styles.heroBlur, "reveal opacity-0 hero-hide")}
          src="/images/hero/stain.png"
          alt=""
        />
      </div>
      <div className="container">
        <div id="hero-wrapper" className={styles.heroWrapper}>
          <div
            data-delay="0.5"
            className={`neon-logo ${
              window.innerWidth > 768 && "mb-[37vh]"
            } hero-hide reveal opacity-0 scale-[0.5] ${styles.hero_logo}`}
          >
            <IconLogo />
          </div>
          <h1
            data-start="top top+=100%"
            data-delay="0.75"
            className="text-center text-[#F6F6F7] reveal opacity-0 scale-[0.95]"
          >
            <h3 className="text-[#F6F6F7] split-text hero-split-text split-text-reveal">
              Non-Custodial
            </h3>{" "}
            <span className="split-text hero-split-text split-text-reveal">
              Composable
              {window.innerWidth <= 768 && <br />} Option Protocol
            </span>
          </h1>
          <button
            data-start="top top+=100%"
            data-delay="1.25"
            className={clsx(
              "btn secondary-btn hero-hide reveal opacity-0 scale-[0.5]",
              styles.hero_button_launch,
            )}
            ref={refButtonLaunch}
            onClick={() =>
              (window.location.href = "https://app.ithacaprotocol.io/")
            }
          >
            <div className={clsx(styles.hero_button_launch_FlyingParticles)}>
              <FlyingParticles element={refButtonLaunch} />
            </div>
            <svg
              preserveAspectRatio="none"
              className="button-bg"
              width="149"
              height="56"
              viewBox="0 0 149 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_bi_478_1224)">
                <rect
                  width="149"
                  height="56"
                  rx="28"
                  fill="white"
                  fill-opacity="0.05"
                />
                <rect
                  width="149"
                  height="56"
                  rx="28"
                  fill="url(#paint0_radial_478_1224)"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="148"
                  height="55"
                  rx="27.5"
                  stroke="url(#paint1_linear_478_1224)"
                  stroke-opacity="0.5"
                />
              </g>
              <defs>
                <filter
                  id="filter0_bi_478_1224"
                  x="-20"
                  y="-20"
                  width="189"
                  height="96"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_478_1224"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_478_1224"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="8" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.368627 0 0 0 0 0.882353 0 0 0 0 0.572549 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect2_innerShadow_478_1224"
                  />
                </filter>
                <radialGradient
                  id="paint0_radial_478_1224"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(74.5 98) rotate(-90) scale(64.4 288.902)"
                >
                  <stop offset="0.0439596" stop-color="white" />
                  <stop offset="0.0896173" stop-color="#5EE192" />
                  <stop
                    offset="0.187274"
                    stop-color="white"
                    stop-opacity="0.873153"
                  />
                  <stop offset="0.284682" stop-color="#5EE192" />
                  <stop offset="1" stop-opacity="0" />
                </radialGradient>
                <linearGradient
                  id="paint1_linear_478_1224"
                  x1="70"
                  y1="-1.28978e-08"
                  x2="72.1667"
                  y2="61.6603"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="0.756956" stop-color="white" stop-opacity="0" />
                  <stop offset="1" stop-color="#54AD7B" />
                </linearGradient>
              </defs>
            </svg>
            Launch App{" "}
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1668 5.83337L5.8335 14.1667M14.1668 5.83337H6.66683M14.1668 5.83337V13.3334"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = "Hero"

export {Hero}
