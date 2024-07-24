import {useGSAP} from "@gsap/react"
import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useContext, useEffect, useRef, useState} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {scrollTo} from "@/shared/hooks/scrollTo"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {IconClose} from "@/shared/icons/close"
import {IconCode} from "@/shared/icons/code"
import {IconLogo} from "@/shared/icons/logo"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataArchitecture} from "./lib/dataArchitecture"
import {ArchitectureItem} from "./ui/architecture-item"
import {LightItem} from "./ui/light-item"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

interface IArchitectureIthaca extends ISwiperSection {}

export const ArchitectureIthaca: FC<IArchitectureIthaca> = ({
  isSectionActive,
}) => {
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refLights = useRef<HTMLDivElement>(null)
  const refPlayer = useRef<Player>(null)
  const refPlayerVideo = useRef<HTMLVideoElement>(null)
  const [isModalActive, setModalActive] = useState<boolean>(false)
  const [activeNavItem, setActiveNavItem] = useState<number>(-1)

  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
  const {refSwiper} = useContext(MainContext)

  const handleLink = (href?: string | null, section?: number) => {
    if (href) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, href)
    } else if (section) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, null, {
        swiper: refSwiper,
        section: section,
      })
    }
  }

  const {isArchitectureModalActive, setArchitectureModalActive} =
    useContext(MainContext)

  const handleModal = () => {
    setArchitectureModalActive((prev: any) => !prev)
  }

  const hoverNavItem = (index: number) => {
    setActiveNavItem((prev) => (prev === index ? -1 : index))
  }

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refPlayer.current?.play()
      refPlayerVideo.current?.play()
    } else {
      refPlayer.current?.pause()
      refPlayerVideo.current?.pause()
    }
  }

  const Animate = () => {
    gsap.fromTo(
      refLights.current,
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1.5,
      },
    )
  }

  const currentSection = sectionActive()

  sectionAnim(refRoot, refRootInner, currentSection)

  const handleActive = () => {
    currentSection.firstActive()

    Animate()
  }

  useEffect(() => {
    controlPlayer(currentSection.isActive)
    currentSection.isActive && !currentSection.isFirstActive && handleActive()
  }, [currentSection.isActive])

  if (isSectionActive === true || isSectionActive === false) {
    useEffect(() => {
      controlPlayer(isSectionActive)

      isSectionActive && !currentSection.isFirstActive && handleActive()
    }, [isSectionActive])
  }

  return (
    <section
      id="architecture-ithaca"
      className={clsx("section", styles.ArchitectureIthaca)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div
        className={clsx(styles.ArchitectureIthaca_inner)}
        onClick={() => {
          if (isModalActive) {
            handleModal()
          }
        }}
        ref={refRootInner}
      >
        <div className={clsx(styles.ArchitectureIthaca_half, styles.content)}>
          <div className={clsx(styles.ArchitectureIthaca_header)}>
            <SectionTitle title="Architecture" />
            <div className={clsx(styles.ArchitectureIthaca_logo)}>
              <IconLogo />
            </div>
            <div className={clsx(styles.ArchitectureIthaca_banner)}>
              <div className={clsx(styles.ArchitectureIthaca_banner_icon)}>
                <IconCode />
              </div>
              <div className={clsx(styles.ArchitectureIthaca_banner_text)}>
                mvp at launch
              </div>
            </div>
          </div>
          <div className={clsx(styles.ArchitectureIthaca_bottom)}>
            <div className={clsx(styles.ArchitectureIthaca_items)}>
              {dataArchitecture.map((e, i) => (
                <ArchitectureItem
                  isModalActive={isModalActive}
                  handleModal={e.handle && handleModal}
                  hover={hoverNavItem}
                  {...e}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={clsx(styles.ArchitectureIthaca_lottie)}>
          <Player
            className={clsx(styles.ArchitectureIthaca_lottie_item)}
            ref={refPlayer}
            keepLastFrame
            src={`/lottiAnimations/architecture-ithaca/architecture-ithaca${
              window.innerWidth <= 560 ? "-mob" : ""
            }.json`}
          >
            <div
              className={clsx(styles.ArchitectureIthaca_lottie_lights)}
              ref={refLights}
            >
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <LightItem isActive={i === activeNavItem} index={i} key={i} />
                ))}
            </div>
            <div className={clsx(styles.ArchitectureIthaca_lottie_links)}>
              <div
                className={clsx(
                  styles.ArchitectureIthaca_lottie_link,
                  styles.ArchitectureIthaca_lottie_links_1,
                )}
                onClick={() => {
                  if (!isModalActive) {
                    handleModal()
                  }
                }}
              />
              <div
                className={clsx(
                  styles.ArchitectureIthaca_lottie_link,
                  styles.ArchitectureIthaca_lottie_links_2,
                )}
                onClick={() => {
                  window.innerWidth > 1024
                    ? handleLink(null, 7)
                    : handleLink("#collateral-optimization")
                }}
              >
                {/* <svg
                  preserveAspectRatio="none"
                  width="260"
                  height="172"
                  viewBox="0 0 260 172"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1925_11541)">
                    <path
                      d="M32 142H228C229.105 142 230 141.105 230 140V45.0372C230 44.5527 229.824 44.0848 229.505 43.7202L218.098 30.683C217.718 30.249 217.169 30 216.592 30H32C30.8954 30 30 30.8954 30 32V140C30 141.105 30.8954 142 32 142Z"
                      fill="white"
                      fillOpacity="0.01"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1925_11541"
                      x="0"
                      y="0"
                      width="260"
                      height="172"
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
                      <feGaussianBlur stdDeviation="15" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1925_11541"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1925_11541"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg> */}
              </div>
              <div
                className={clsx(
                  styles.ArchitectureIthaca_lottie_link,
                  styles.ArchitectureIthaca_lottie_links_3,
                )}
                onClick={() => {
                  window.innerWidth > 1024
                    ? handleLink(null, 5)
                    : handleLink("#mixed-integer")
                }}
              >
                <svg
                  preserveAspectRatio="none"
                  width="260"
                  height="144"
                  viewBox="0 0 260 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1923_11532)">
                    <path
                      d="M37.5106 30.3017L30.2842 37.7087C30.102 37.8955 30 38.1461 30 38.407V105.207C30 105.46 30.0955 105.703 30.2674 105.888L37.5082 113.681C37.6974 113.884 37.9628 114 38.2408 114H221.759C222.037 114 222.303 113.884 222.492 113.681L229.733 105.888C229.904 105.703 230 105.46 230 105.207V38.407C230 38.1461 229.898 37.8955 229.716 37.7087L222.489 30.3017C222.301 30.1088 222.043 30 221.774 30H38.2263C37.9568 30 37.6988 30.1088 37.5106 30.3017Z"
                      fill="#BEBECD"
                      fillOpacity="0.01"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1923_11532"
                      x="0"
                      y="0"
                      width="260"
                      height="144"
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
                      <feGaussianBlur stdDeviation="15" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1923_11532"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1923_11532"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div
                className={clsx(
                  styles.ArchitectureIthaca_lottie_link,
                  styles.ArchitectureIthaca_lottie_links_4,
                )}
                onClick={() => {
                  window.innerWidth > 1024
                    ? handleLink(null, 1)
                    : handleLink("#matching-engine")
                }}
              >
                <svg
                  preserveAspectRatio="none"
                  width="262"
                  height="232"
                  viewBox="0 0 262 232"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1915_11531)">
                    <path
                      d="M33 201H229C230.105 201 231 200.105 231 199V53.516C231 53.0417 230.831 52.5828 230.524 52.2213L213.099 31.7053C212.719 31.2579 212.162 31 211.575 31H33C31.8954 31 31 31.8954 31 33V199C31 200.105 31.8954 201 33 201Z"
                      fill="white"
                      fillOpacity="0.01"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1915_11531"
                      x="0.200001"
                      y="0.200001"
                      width="261.6"
                      height="231.6"
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
                      <feGaussianBlur stdDeviation="15.4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1915_11531"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1915_11531"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </Player>
        </div>
      </div>
    </section>
  )
}
