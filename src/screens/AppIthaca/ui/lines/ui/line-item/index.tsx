import clsx from "clsx"
import gsap from "gsap"
import {FC, RefObject, useEffect, useLayoutEffect, useRef} from "react"

import styles from "./index.module.scss"

interface ILineItem {
  refRoot: RefObject<HTMLDivElement>
}

export const LineItem: FC<ILineItem> = ({refRoot}) => {
  const refLine = useRef<HTMLDivElement>(null)

  const randomNum = (max: number) => {
    return Math.floor(Math.random() * (max + 1)) + 1
  }

  const Animate = () => {
    let parent = refRoot.current

    if (parent) {
      let parentWidth = parent.clientWidth
      let parentHeight = parent.clientHeight

      let tl1 = gsap.timeline({
        defaults: {
          delay: 0,
          duration: 1,
          ease: "power2.inOut",
        },
      })

      tl1.set(refLine.current, {
        opacity: 1,
        rotate: randomNum(1) == 1 ? 0 : 180,
        x: randomNum(parentWidth),
        y: randomNum(parentHeight),
      })

      tl1.fromTo(
        refLine.current,
        {
          width: 0,
        },
        {width: randomNum(parentWidth), opacity: 0, duration: randomNum(5)},
      )

      tl1.eventCallback("onComplete", () => {
        setTimeout(() => {
          Animate()
        }, 100)
      })
    }
  }

  useLayoutEffect(() => {
    Animate()
  }, [])

  return <div className={clsx(styles.LineItem)} ref={refLine} />
}
