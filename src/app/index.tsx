/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react-refresh/only-export-components */
import {MotionValue, easeInOut, useScroll, useTransform} from "framer-motion"
import gsap from "gsap"
import {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import "swiper/css"
import {Mousewheel} from "swiper/modules"
import {Swiper, SwiperSlide} from "swiper/react"
import {SwiperOptions, Swiper as SwiperTypes} from "swiper/types"

import {Header} from "@/layout/Header/Header"
import {Menu} from "@/layout/Menu/Menu"
import {Preloader} from "@/layout/Preloader"

import {Scene} from "@/shared/Scene/Scene"
import {ArchitectureIthacaModal} from "@/shared/components/ArchitectureIthacaModal"
import {CanvasStars} from "@/shared/components/CanvasStars"
import {ScrollDown} from "@/shared/components/ScrollDown"

import {MainContext} from "./providers/MainContext"
import {ScrollContext} from "./providers/ScrollContext"
import "./styles/index.scss"
import {
  AppIthaca,
  Architecture,
  ArchitectureIthaca,
  AuctionsCharacteristics,
  CollateralOptimization,
  Ecosystem,
  Footer,
  Hero,
  MatchingEngine,
  Mission,
  MixedInteger,
  OptimizationSetup,
  PortfolioDominance,
  RiskSharing,
  Roadmap,
} from "@/screens"

const styles: any = {position: "relative", zIndex: 2}

interface Values {
  scrollData: MotionValue<{
    // Blob
    blobOut: number
    blobPosY: number
    blobMobilePosY: number
    blobPosX: number
    blobNextSection: number
    blobSectionFour: number

    // Logo
    logoOut: number
    logoAlphaOut: number

    // Universe
    universeIn: number
    universeOut: number
    universeScale: number

    // Grid
    gridOut: number
  }>
}
// @ts-expect-error
const values: Values = {}
export const getProgress = () => values

function App() {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [isLoad, setLoad] = useState<boolean>(false)
  const [timeLoad, setTimeLoad] = useState<number>(15)
  const [scrollDownPos, setScrollDownPos] = useState<"left" | "right">("right")
  const refMainWrapper = useRef<HTMLDivElement>(null)

  const [isArchitectureModalActive, setArchitectureModalActive] =
    useState<boolean>(false)

  useEffect(() => {
    if (refMainWrapper.current) {
      if (!isLoad) {
        refMainWrapper.current.classList.add("freezed")
      } else {
        refMainWrapper.current.classList.remove("freezed")
      }
    }
  }, [isLoad])

  // !IMPORTANT: Gsap Smoothscroll works pretty bad on IOS mobile devices
  // But for stable scene display on mobile devices we required smooth touch scroll
  // Thats why we use Lenis instead

  // !IMPORTANT: We use framer for react scroll animations, but it can sagnifically increase bundle size
  // Feel free to migrate this to GSAP
  // Scroll Animation

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const revealElements = document.querySelectorAll<HTMLElement>(".reveal")

      revealElements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: el.dataset.start ?? "top top+=75%",
          end: el.dataset.end ?? "bottom bottom-=75%",
          // markers: true,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              translate: 0,
              rotate: 0,
              rotateX: 0,
              rotateZ: 0,
              rotateY: 0,
              scaleX: 1,
              scaleY: 1,
              x: 0,
              xPercent: 0,
              y: 0,
              yPercent: 0,
              duration: el.dataset.duration ?? 1,
              delay: el.dataset.delay ?? 0,
            }),
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollable1 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress1} = useScroll({
    target: scrollable1,
    offset: ["start start", "end start"],
  })
  const scrollable2 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress2} = useScroll({
    target: scrollable2,
    offset: ["start start", "end start"],
  })
  const scrollable3 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress3} = useScroll({
    target: scrollable3,
    offset: ["start end", "end end"],
  })
  const scrollable4 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress4} = useScroll({
    target: scrollable4,
    offset: ["start end", "end end"],
  })
  const scrollable5 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress5} = useScroll({
    target: scrollable5,
    offset: ["start end", "end end"],
  })
  const scrollable6 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress6} = useScroll({
    target: scrollable6,
    offset: ["start end", "end end"],
  })
  const scrollable7 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress7} = useScroll({
    target: scrollable7,
    offset: ["start end", "end end"],
  })
  const scrollable8 = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress: progress8} = useScroll({
    target: scrollable8,
    offset: ["start end", "end end"],
  })
  //
  // Global Timeline
  // Based on this parameters scene objects change on scroll
  const globalProgress = useTransform(
    () =>
      progress1.get() +
      progress2.get() +
      progress3.get() +
      progress4.get() +
      progress5.get() +
      progress6.get() +
      progress7.get() +
      progress8.get(),
  )
  const scrollData = useTransform(
    globalProgress,
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [
      {
        //0
        blobOut: 0,
        logoOut: 0,
        logoAlphaOut: 0,
        blobNextSection: 0,
        blobSectionFour: 0,

        universeIn: 0,
        universeOut: 0,
        universeScale: 0,

        blobPosY: 0,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 0,
      },
      {
        //1
        blobOut: 1,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 0,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 0,
        universeScale: 0.4,

        blobPosY: 0,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //2
        blobOut: 1,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 0,
        universeScale: 0.65,

        blobPosY: 0,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //3 Universe Boom
        blobOut: 1,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 0.5,
        universeScale: 0.8,

        blobPosY: 0,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //4 Blob In
        blobOut: 0,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 1,
        universeScale: 0.8,

        blobPosY: 0,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //5 Blob Move Down
        blobOut: 0,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 1,
        universeScale: 0.8,

        blobPosY: -1,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //6 Still Blob Down
        blobOut: 0,
        logoOut: 0,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 0,

        universeIn: 1,
        universeOut: 1,
        universeScale: 0.8,

        blobPosY: -1,
        blobMobilePosY: 0,
        blobPosX: 0,
        gridOut: 1,
      },
      {
        //7 Blob Move Right
        blobOut: 0,
        logoOut: 0,
        logoAlphaOut: 0,
        blobNextSection: 1,
        blobSectionFour: 1,

        universeIn: 1,
        universeOut: 1,
        universeScale: 0.8,

        blobPosY: 0,
        blobMobilePosY: -0.35,
        blobPosX: 1,
        gridOut: 1,
      },
      {
        //8 Blob end
        blobOut: 1,
        logoOut: 1,
        logoAlphaOut: 1,
        blobNextSection: 1,
        blobSectionFour: 1,

        universeIn: 1,
        universeOut: 1,
        universeScale: 0.8,

        blobPosY: 0,
        blobMobilePosY: 0,
        // blobPosX: 1,
        blobPosX: 0,
        gridOut: 1,
      },
    ],
    {clamp: true, ease: easeInOut},
  )
  values.scrollData = scrollData

  const refSwiper = useRef<SwiperTypes>()
  const refSwiperWrapper = useRef<HTMLDivElement>(null)

  const swiperSettings: SwiperOptions = {
    slidesPerView: 1,
    speed: 1500,
    allowTouchMove: true,
    grabCursor: false,
    direction: "vertical",
    modules: [Mousewheel],
    mousewheel: true,
  }

  const SwiperSections = [
    MatchingEngine,

    AuctionsCharacteristics,

    RiskSharing,

    OptimizationSetup,

    MixedInteger,

    PortfolioDominance,

    CollateralOptimization,

    AppIthaca,

    ArchitectureIthaca,

    Roadmap,

    Footer,
  ]

  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
  const [swiperActiveIndex, setSwiperActiveIndex] = useState<number>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth > 1024) {
        gsap.set(refSwiperWrapper.current, {
          pointerEvents: "none",
        })

        ScrollTrigger.create({
          trigger: refSwiperWrapper.current,
          start: `top top`,
          end: `10% top`,
          pin: true,
          // markers: true,

          onUpdate(self) {
            console.log(self.progress)

            if (self.progress > 0.5) {
              console.log("set all")
              gsap.set(refSwiperWrapper.current, {
                pointerEvents: "all",
              })
            }

            if (self.progress == 0) {
              console.log("leave progress")
              refSwiper.current?.slideTo(0, 0)
              gsap.set(refSwiperWrapper.current, {
                pointerEvents: "none",
              })
            }
          },

          // onLeave() {
          //   console.log("leave")
          //   gsap.set(refSwiperWrapper.current, {
          //     pointerEvents: "none",
          //   })
          //   refSwiper.current?.slideTo(0)
          // },
          // onLeaveBack() {
          //   console.log("leave back")
          //   gsap.set(refSwiperWrapper.current, {
          //     pointerEvents: "none",
          //   })
          // },
          // onEnter() {
          //   console.log("enter")
          //   gsap.set(refSwiperWrapper.current, {
          //     pointerEvents: "all",
          //   })
          // },
          // onEnterBack() {
          //   console.log("enter back")
          //   gsap.set(refSwiperWrapper.current, {
          //     pointerEvents: "all",
          //   })
          // },
        })

        if (
          refSwiperWrapper.current &&
          refSwiperWrapper.current.parentElement
        ) {
          // refSwiperWrapper.current.parentElement.style.mixBlendMode = "lighten"
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <MainContext.Provider
      value={{
        menuActive,
        setMenuActive,
        isLoad,
        setLoad,
        timeLoad,
        scrollDownPos,
        setScrollDownPos,
        refSwiper,
        isArchitectureModalActive,
        setArchitectureModalActive,
      }}
    >
      <div className="MainWrapper" ref={refMainWrapper}>
        <ArchitectureIthacaModal />
        <ScrollDown />
        <img className="bg_noise" src="/images/noise.png" alt="" />
        {!isLoad && <Preloader />}
        <Header />
        <Menu />

        {/* IMPORTANT: You can detect scene load progress via Suspense */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <Hero ref={scrollable1} />
        <div ref={scrollable2} style={styles}>
          <Mission />
        </div>

        <div
          /* Controls Universe Boom */ ref={scrollable3}
          style={{...styles, /*height: 800 / 16 + 'rem'*/ height: "40vh"}}
        ></div>
        <div
          /* Controls Blob In */ ref={scrollable4}
          style={{...styles, height: "100vh"}}
        ></div>

        {/* Controls Blob Move Down */}
        <div ref={scrollable5} style={{...styles, height: "40vh"}}></div>

        <div /* Blob Just Stay Down There */ ref={scrollable6}>
          <Ecosystem />
        </div>
        <Architecture /* Blob Goes To The Right */ ref={scrollable7} />

        {window.innerWidth > 1024 ? (
          <div className="Swiper_wrapper_inner" ref={refSwiperWrapper}>
            <Swiper
              {...swiperSettings}
              className={"Swiper"}
              onSlideChange={(swiper) => {
                const activeIndex = swiper.activeIndex
                if (activeIndex > 0) {
                  setWheelMultiplayer(0)
                  setTouchMultiplier(0)
                } else {
                  setTimeout(() => {
                    setWheelMultiplayer(0.75)
                    setTouchMultiplier(0.5)
                  }, 1500)
                }
                if (refSwiperWrapper.current) {
                  refSwiperWrapper.current.style.pointerEvents = "all"
                }

                if (activeIndex != 8) {
                  setArchitectureModalActive(false)
                }
              }}
              onInit={(swiper) => {
                refSwiper.current = swiper
              }}
            >
              {/* <img className="bg_noise" src="/images/noise.png" alt="" /> */}
              {SwiperSections.map((Section, i) => (
                <SwiperSlide className={"Swiper_slide"}>
                  {({isActive}) => (
                    <Section
                      ref={i == 0 ? scrollable8 : null}
                      isSectionActive={isActive}
                      key={i}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <>
            {SwiperSections.map((Section, i) => (
              <Section ref={i == 0 ? scrollable8 : null} key={i} />
            ))}
          </>
        )}
      </div>
    </MainContext.Provider>
  )
}

export default App
