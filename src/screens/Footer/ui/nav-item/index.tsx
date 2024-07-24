import clsx from "clsx"
import gsap from "gsap"
import {FC, useContext, useRef} from "react"

import {scrollTo} from "@/shared/hooks/scrollTo"
import {IconArrowSimple} from "@/shared/icons/arrow-simple"

import styles from "./index.module.scss"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

interface INavItem {
  title: string
  href?: string
  section?: number
}

export const NavItem: FC<INavItem> = ({title, href, section}) => {
  const {refSwiper} = useContext(MainContext)
  const refIcon = useRef<HTMLDivElement>(null)

  const hoverAnim = (isActive: boolean) => {
    if (refIcon.current) {
      gsap.to(refIcon.current, {
        width: isActive ? refIcon.current.scrollWidth : 0,
        duration: 0.2,
        ease: "power0",
      })
    }
  }

  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
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

  return (
    <div
      className={clsx(styles.NavItem)}
      onClick={() => {
        if (href) {
          handleLink(href)
        } else if (section) {
          handleLink(null, section)
        }
      }}
      onMouseEnter={() => hoverAnim(true)}
      onMouseLeave={() => hoverAnim(false)}
    >
      <div className={clsx(styles.NavItem_icon)} ref={refIcon}>
        <IconArrowSimple />
      </div>
      <div className={clsx(styles.NavItem_title)}>{title}</div>
    </div>
  )
}
