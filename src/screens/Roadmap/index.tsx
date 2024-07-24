import clsx from "clsx"
import {FC, useEffect, useRef, useState} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataRoadmap} from "./lib/dataRoadmap"
import {RoadmapItem} from "./ui/roadmap-item"

interface IRoadmap extends ISwiperSection {}

export const Roadmap: FC<IRoadmap> = ({isSectionActive}) => {
  const [completeStage, setCompleteStage] = useState<number>(-1)
  const [activeStage, setActiveStage] = useState<number>(-1)

  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refGlow = useRef<HTMLDivElement>(null)

  const toggleStage = (index: number) => {
    setActiveStage(index)
  }

  const completeStageAnim = (index: number) => {
    setCompleteStage(index)
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

    setCompleteStage(0)
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
      id="roadmap"
      className={clsx("section", styles.Roadmap)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.Roadmap_inner)} ref={refRootInner}>
        <div className={clsx(styles.Roadmap_glow)} ref={refGlow}>
          <img src="/images/roadmap/glow.png" alt="" />
        </div>
        <video
          className={clsx(styles.Roadmap_wave)}
          muted
          autoPlay
          playsInline
          loop
          preload="auto"
        >
          <source src="/videos/roadmap/roadmap-wave.webm" type="video/webm" />
          <source src="/videos/roadmap/roadmap-wave.mp4" type="video/mp4" />
        </video>
        <div className={clsx(styles.Roadmap_nav)}>
          {dataRoadmap.map((e, i) => (
            <div
              className={clsx(
                styles.Roadmap_nav_item,
                i == activeStage && styles.active,
              )}
              onClick={() => toggleStage(i)}
              key={i}
            >
              {`ITHACA ${e.version}`}
            </div>
          ))}
        </div>
        {/* <div className={clsx(styles.Roadmap_logo)}>
        <IconLogo />
      </div> */}
        <SectionTitle title="Roadmap" />
        <div className={clsx(styles.Roadmap_items)}>
          {dataRoadmap.map((e, i) => (
            <RoadmapItem
              {...e}
              index={i}
              indexReverse={dataRoadmap.length - (i + 1)}
              completeStage={completeStage}
              completeStageAnim={completeStageAnim}
              lastElement={dataRoadmap.length == i + 1}
              isActive={activeStage == i}
              toggleStage={toggleStage}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
