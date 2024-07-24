import BgMob from "/images/app-ithava/bg-mob.png"
import Bg from "/images/app-ithava/bg.png"
import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {Draggable} from "gsap/all"
import {FC, useEffect, useRef, useState} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataAppIthaca} from "./lib/dataAppIthaca"
import {Lines} from "./ui/lines"
import {MockupItem} from "./ui/mockup-item"
import {NavItem} from "./ui/nav-item"

gsap.registerPlugin(Draggable)

interface IAppIthaca extends ISwiperSection {}

export const AppIthaca: FC<IAppIthaca> = ({isSectionActive}) => {
  const [completeStage, setCompleteStage] = useState<number>(-1)
  const [activeStage, setActiveStage] = useState<number>(-1)
  const [isStartAnim, setStartAnim] = useState<boolean>(false)

  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refGlow = useRef<HTMLDivElement>(null)
  const refBg = useRef<HTMLDivElement>(null)
  const refMockups = useRef<HTMLDivElement>(null)

  const toggleStage = (index: number) => {
    setActiveStage(index)
  }

  const completeStageAnim = (index: number) => {
    setCompleteStage(index)
  }

  const Animate = () => {
    gsap.fromTo(
      refBg.current,
      {opacity: 0, yPercent: 10, scale: 0.9},
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        duration: 2,
        ease: "power1.inOut",
      },
    )
  }

  useEffect(() => {
    if (completeStage == 3 && refGlow.current) {
      refGlow.current.classList.add(styles.active)
    }
  }, [completeStage])

  const currentSection = sectionActive()

  sectionAnim(refRoot, refRootInner, currentSection)

  const handleActive = () => {
    currentSection.firstActive()

    setStartAnim(true)
    Animate()
    setTimeout(() => {
      completeStageAnim(0)
    }, 1000)
  }

  useEffect(() => {
    currentSection.isActive && !currentSection.isFirstActive && handleActive()
  }, [currentSection.isActive])

  if (isSectionActive === true || isSectionActive === false) {
    useEffect(() => {
      isSectionActive && !currentSection.isFirstActive && handleActive()
    }, [isSectionActive])
  }

  return (
    <section
      id="app"
      className={clsx("section", styles.AppIthaca)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.AppIthaca_inner)} ref={refRootInner}>
        <div className={clsx(styles.AppIthaca_bg)} ref={refBg}>
          <img src={window.innerWidth > 1024 ? Bg : BgMob} alt="" />
        </div>
        <div className={clsx(styles.AppIthaca_nav)}>
          {dataAppIthaca.map((e, i) => (
            <NavItem
              {...e.nav}
              index={i}
              isStartAnim={isStartAnim}
              completeStageAnim={completeStageAnim}
              isActive={activeStage == i}
              completeStage={completeStage}
              lastElement={dataAppIthaca.length == i + 1}
              toggleStage={toggleStage}
              accessToggle={completeStage == dataAppIthaca.length}
              key={i}
            />
          ))}
          <div
            className={clsx(
              styles.AppIthaca_lines,
              isStartAnim && styles.visible,
            )}
          >
            <Lines />
          </div>
        </div>
        <div className={clsx(styles.AppIthaca_mockups)} ref={refMockups}>
          {dataAppIthaca.map((e, i) => (
            <MockupItem
              {...e.mockup}
              completeStage={completeStage}
              isActive={activeStage == i}
              isStartAnim={isStartAnim}
              index={i}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
