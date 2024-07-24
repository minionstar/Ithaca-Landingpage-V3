import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef, useState} from "react"

import styles from "./index.module.scss"

interface IPolicyItem {
  title: string
  href: string
}

export const PolicyItem: FC<IPolicyItem> = ({title, href}) => {
  const [isHover, setHover] = useState<boolean>(false)
  const refRoot = useRef<HTMLAnchorElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refLineRight = useRef<HTMLDivElement>(null)
  const refLineLeft = useRef<HTMLDivElement>(null)

  useEffect(() => {
    toggleTimeline(!isHover)
  }, [isHover])

  const tl = useRef<GSAPTimeline>()

  const {contextSafe} = useGSAP(() => {
    tl.current = gsap
      .timeline({
        defaults: {
          duration: 0.5,
          ease: "power2.inOut",
        },
      })
      .fromTo(
        refRootInner.current,
        {
          color: "#fff",
        },
        {
          color: "#5EE192",
        },
      )
      .fromTo(
        refLineRight.current,
        {
          width: "100%",
        },
        {
          width: "0%",
        },
        "<50%",
      )
      .fromTo(
        refLineLeft.current,
        {
          width: "0%",
        },
        {
          width: "100%",
        },
        "<50%",
      )
  })

  const toggleTimeline = contextSafe((isReverse: boolean) => {
    if (tl.current) {
      tl.current.reversed(isReverse)
    }
  })

  return (
    <a
      href={href}
      target="_blank"
      className={clsx(styles.PolicyItem)}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      ref={refRoot}
    >
      <div className={clsx(styles.PolicyItem_inner)} ref={refRootInner}>
        <div className={clsx(styles.PolicyItem_LineRight)} ref={refLineRight} />
        <div className={clsx(styles.PolicyItem_LineLeft)} ref={refLineLeft} />
        {title}
      </div>
    </a>
  )
}
