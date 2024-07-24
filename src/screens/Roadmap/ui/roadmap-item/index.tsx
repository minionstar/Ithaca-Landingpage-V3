import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef, useState} from "react"

import {IconLogo} from "@/shared/icons/logo"

import styles from "./index.module.scss"

interface IRoadmapItem {
  version: string
  subtitle?: string
  items: string[]
  index: number
  indexReverse: number
  completeStage: number
  completeStageAnim: (index: number) => void
  toggleStage: (index: number) => void
  lastElement: boolean
  isActive: boolean
}

export const RoadmapItem: FC<IRoadmapItem> = ({
  version,
  subtitle,
  items,
  index,
  indexReverse,
  completeStage,
  completeStageAnim,
  toggleStage,
  lastElement,
  isActive,
}) => {
  const refItemsRing = useRef<HTMLDivElement[] | null[]>([])
  const refItemsText = useRef<HTMLDivElement[] | null[]>([])
  const refTitle = useRef<HTMLDivElement>(null)
  const refSubtitle = useRef<HTMLDivElement>(null)
  const refRoot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (completeStage == index) {
      let tl = gsap.timeline({
        defaults: {
          delay: 0,
          duration: 1,
          ease: "power2.inOut",
          immediateRender: true,
        },
      })

      tl.fromTo(
        refTitle.current,
        {
          opacity: 0,
          scale: 0.9,
          yPercent: 10,
        },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
        },
      )

      refSubtitle &&
        tl.fromTo(
          refSubtitle.current,
          {
            opacity: 0,
            scale: 0.9,
            yPercent: 10,
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
          },
          "<20%",
        )

      refItemsRing.current.map((e, i) => {
        tl.fromTo(
          e,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            // ease: "power2.out",
          },
          "<20%",
        ).fromTo(
          refItemsText.current[i],
          {
            opacity: 0,
            xPercent: 10,
          },
          {
            opacity: 1,
            xPercent: 0,
            duration: 1,
          },
          "<20%",
        )
      })

      tl.to(refRoot.current, {
        opacity: 0.3,
        duration: 0.1,
      })

      tl.eventCallback("onComplete", () => {
        lastElement && toggleStage(index)
        completeStageAnim(index + 1)
      })
    }
  }, [completeStage])

  return (
    <div
      className={clsx(
        styles.RoadmapItem,
        isActive && completeStage >= index + 1 && styles.active,
      )}
      ref={refRoot}
    >
      <div className={clsx(styles.RoadmapItem_light)} />
      <div
        className={clsx(styles.RoadmapItem_inner)}
        style={
          window.innerWidth > 1024 ? {marginTop: `${50 * indexReverse}px`} : {}
        }
        onMouseEnter={() => {
          toggleStage(index)
        }}
        onMouseLeave={() => {
          toggleStage(-1)
        }}
      >
        <div
          className={clsx(styles.RoadmapItem_title, "dalek-font")}
          ref={refTitle}
        >
          <IconLogo /> {version}
        </div>
        {subtitle && (
          <div className={clsx(styles.RoadmapItem_subtitle)} ref={refSubtitle}>
            {subtitle}
          </div>
        )}
        <div className={clsx(styles.RoadmapItem_items)}>
          {items.map((e, i) => (
            <div className={clsx(styles.RoadmapItem_items_item)} key={i}>
              <div
                className={clsx(styles.RoadmapItem_items_item_ring)}
                ref={(ref) => (refItemsRing.current[i] = ref)}
              />
              <div
                className={clsx(styles.RoadmapItem_items_item_text)}
                ref={(ref) => (refItemsText.current[i] = ref)}
              >
                {e}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
