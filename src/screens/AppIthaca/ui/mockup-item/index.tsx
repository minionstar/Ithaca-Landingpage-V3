import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {Draggable} from "gsap/all"
import {FC, useEffect, useRef} from "react"

import styles from "./index.module.scss"

gsap.registerPlugin(Draggable)

interface IMockupItem {
  img: string
  completeStage: number
  index: number
  isActive: boolean
  isStartAnim: boolean
}

export const MockupItem: FC<IMockupItem> = ({
  img,
  completeStage,
  index,
  isActive,
  isStartAnim,
}) => {
  const refMockup = useRef<HTMLImageElement>(null)
  const refImg = useRef<HTMLDivElement>(null)

  const animateVisible = () => {
    gsap.to(refImg.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    })
  }

  const animateHidden = () => {
    gsap.to(refImg.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
  }

  useEffect(() => {
    if (isStartAnim && index == 0) {
      let tl1 = gsap.timeline({
        defaults: {
          delay: 0,
          duration: 3,
          ease: "expo.out",
        },
      })

      tl1.fromTo(
        refImg.current,
        {
          opacity: 0,
          rotateX: "50deg",
          // translateZ: "-150px",
          yPercent: 200,
          scale: 0.6,
        },
        {
          opacity: 1,
          rotateX: "0deg",
          translateZ: "0px",
          yPercent: 0,
          scale: 1,
        },
      )
      // .to(
      //   refImg.current,
      //   {
      //     yPercent: 0,
      //     duration: 2,
      //   },
      //   "<30%",
      // )
    }
  }, [isStartAnim])

  useEffect(() => {
    completeStage == index ? animateVisible() : animateHidden()
  }, [completeStage])

  useEffect(() => {
    isActive ? animateVisible() : animateHidden()
  }, [isActive])
  useGSAP(() => {
    if (window.innerWidth <= 1024) {
      Draggable.create(refMockup.current, {
        type: "x",
        bounds: window,
        inertia: true,
      })
    }
  }, [])

  return (
    <div
      className={clsx(
        styles.MockupItem,
        completeStage == index && styles.active,
        isActive && styles.active,
      )}
    >
      <div className={clsx(styles.MockupItem_img)} ref={refImg}>
        <div
          className={clsx(
            styles.MockupItem_arrows,
            styles[`item_${index + 1}`],
          )}
        />
        <img src={img} alt="" ref={refMockup} />
      </div>
    </div>
  )
}
