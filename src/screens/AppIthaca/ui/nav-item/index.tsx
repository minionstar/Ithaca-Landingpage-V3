import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useLayoutEffect, useRef, useState} from "react"

import styles from "./index.module.scss"

interface INavItem {
  title: string
  subtitle?: string
  index: number
  isStartAnim: boolean
  isActive: boolean
  completeStage: number
  completeStageAnim: (index: number) => void
  toggleStage: (index: number) => void
  lastElement: boolean
  accessToggle: boolean
}

export const NavItem: FC<INavItem> = ({
  title,
  subtitle,
  index,
  isStartAnim,
  isActive,
  completeStage,
  completeStageAnim,
  lastElement,
  toggleStage,
  accessToggle,
}) => {
  const refTitle = useRef<HTMLDivElement>(null)
  const refSubtitle = useRef<HTMLDivElement>(null)
  const refProgressbar = useRef<HTMLDivElement>(null)
  const refProgress = useRef<HTMLDivElement>(null)

  const AnimateHide = () => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 1,
        ease: "expo.inOut",
      },
    })
    tl1.to(
      refTitle.current,
      {
        opacity: 0.3,
        yPercent: 0,
      },
      "<20%",
    )

    tl1.to(
      refSubtitle.current,
      {
        opacity: 0.3,
        yPercent: 0,
      },
      "<20%",
    )

    tl1.to(
      refProgress.current,
      {
        width: "0%",
      },
      "<20%",
    )

    tl1.to(
      refProgressbar.current,
      {
        opacity: 0,
      },
      "<20%",
    )
  }

  const AnimateVisible = () => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 1,
        ease: "expo.inOut",
      },
    })

    tl1.to(refTitle.current, {
      opacity: 1,
    })

    refSubtitle &&
      tl1.to(
        refSubtitle.current,
        {
          opacity: 1,
        },
        "<20%",
      )

    tl1.to(
      refProgressbar.current,
      {
        opacity: 1,
      },
      "<20%",
    )

    tl1.to(
      refProgress.current,
      {
        width: "100%",
        duration: 1.5,
      },
      "<20%",
    )
  }

  useEffect(() => {
    if (completeStage == index) {
      let tl1 = gsap.timeline({
        defaults: {
          delay: 0,
          duration: 1,
          ease: "power2.inOut",
          immediateRender: true,
        },
      })

      tl1.to(refTitle.current, {
        opacity: 1,
        yPercent: -30,
      })

      tl1.to(
        refSubtitle.current,
        {
          opacity: 1,
          yPercent: -30,
        },
        "<20%",
      )

      tl1.to(
        refProgress.current,
        {
          width: "100%",
          opacity: 1,
          duration: 1.5,
        },
        "<40%",
      )

      tl1.eventCallback("onComplete", () => {
        setTimeout(() => {
          if (!lastElement && completeStage <= index) {
            setTimeout(() => {
              AnimateHide()
            }, 500)
          } else if (lastElement) {
            toggleStage(index)
          }
          completeStageAnim(index + 1)
        }, 1000)
      })
    }
  }, [completeStage])

  const Animate = () => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 1,
        ease: "power2.inOut",
      },
    })

    tl1.fromTo(
      refTitle.current,
      {
        opacity: 0,
        xPercent: -10,
      },
      {
        opacity: 0.3,
        xPercent: 0,
      },
    )

    tl1.fromTo(
      refSubtitle.current,
      {
        opacity: 0,
        xPercent: -10,
      },
      {
        opacity: 0.3,
        xPercent: 0,
      },
      "<40%",
    )

    tl1.fromTo(
      refProgressbar.current,
      {
        width: "0%",
        opacity: 0,
        // xPercent: -10,
      },
      {
        width: "100%",
        opacity: 1,
        // xPercent: 0,
      },
      "<40%",
    )
  }

  useEffect(() => {
    isStartAnim && Animate()
  }, [isStartAnim])

  useEffect(() => {
    if (isStartAnim) isActive ? AnimateVisible() : AnimateHide()
  }, [isActive])

  return (
    <div
      className={clsx(styles.NavItem)}
      onClick={() => accessToggle && toggleStage(index)}
    >
      <div className={clsx(styles.NavItem_title)} ref={refTitle}>
        {title}
      </div>
      {subtitle && (
        <div className={clsx(styles.NavItem_subtitle)} ref={refSubtitle}>
          {subtitle}
        </div>
      )}
      <div className={clsx(styles.NavItem_progressbar)} ref={refProgressbar}>
        <div className={clsx(styles.NavItem_progress)} ref={refProgress} />
      </div>
    </div>
  )
}
