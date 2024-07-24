import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef} from "react"

import styles from "./index.module.scss"

interface ILightItem {
  isActive: boolean
  index: number
}

const dataItemsAnim = [
  {
    border: [
      {
        opacity: 0,
      },
      {
        opacity: 0,
      },
    ],
  },
  {
    //resize
    // border: [
    //   {
    //     yPercent: 5,
    //     xPercent: 13.5,
    //     width: "86%",
    //     height: "80%",
    //   },
    //   {
    //     yPercent: 0,
    //     xPercent: 0,
    //     width: "100%",
    //     height: "100%",
    //   },
    // ],

    border: [
      {
        opacity: 1,
      },
      {
        opacity: 1,
      },
    ],
  },
]

export const LightItem: FC<ILightItem> = ({isActive, index}) => {
  const refBorder = useRef<HTMLDivElement>(null)
  const refBorderLine = useRef<HTMLDivElement>(null)
  const refLight = useRef<HTMLDivElement>(null)
  const tl1 = useRef<any>()

  useGSAP(() => {
    tl1.current = gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: "power2.inOut",
        },
      })
      // .to(refBorderLine.current, {
      //   height: 0,
      // })
      .fromTo(
        refBorder.current,
        {
          ...dataItemsAnim[index].border[0],
        },
        {
          ...dataItemsAnim[index].border[1],
        },
        "<1%",
      )
      .fromTo(
        refLight.current,
        {
          height: "0%",
          opacity: 0,
        },
        {
          height: "100%",
          opacity: 1,
        },
        "<50%",
      )
  })

  useEffect(() => {
    if (tl1.current) {
      isActive ? tl1.current.play() : tl1.current.reverse()
    }
  }, [isActive])

  return (
    <div className={clsx(styles.LightItem, styles[`_${index + 1}`])}>
      <div className={clsx(styles.LightItem_border)} ref={refBorder} />
      <div className={clsx(styles.LightItem_line)} ref={refBorderLine} />
      <div className={clsx(styles.LightItem_light_box)}>
        <div className={clsx(styles.LightItem_light)} ref={refLight} />
      </div>
    </div>
  )
}
