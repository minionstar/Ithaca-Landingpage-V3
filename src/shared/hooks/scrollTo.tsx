import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import {useContext} from "react"

gsap.registerPlugin(ScrollToPlugin)

export const scrollTo = (
  setWheelMultiplayer: any,
  setTouchMultiplier: any,
  href?: string | null,
  swiperSection?: {
    swiper: any
    section: number
  },
) => {
  setWheelMultiplayer(0.75)
  setTouchMultiplier(0.5)

  let anchor = null

  if (href) {
    anchor = document.querySelector(href) as HTMLDivElement
  } else {
    anchor = swiperSection?.swiper.current.hostEl
  }

  swiperSection &&
    swiperSection.swiper.current.slideTo(swiperSection.section - 1, 0)

  if (anchor) {
    const styles = window.getComputedStyle(anchor)
    const matrixStyles = new DOMMatrixReadOnly(styles.transform)
    const height = Number(styles.height.replace("px", ""))
    const translateY = matrixStyles.m42
    const anchorPosY = anchor.getBoundingClientRect().y
    let calcScrollTo = 0
    let elem = href && document.querySelector(href)
    if (elem && elem.id == "mission") {
      calcScrollTo += 350
      if (elem.parentElement)
        calcScrollTo +=
          window.scrollY + elem.parentElement?.getBoundingClientRect().y

      gsap.set(window, {
        scrollTo: 0,
      })
      gsap.to(window, {
        scrollTo: calcScrollTo,
        duration: 2,
        delay: 0.1,
      })

      gsap.set(swiperSection?.swiper.current.hostEl.parentElement.current, {
        pointerEvents: "none",
      })
    } else {
      calcScrollTo += window.scrollY + anchorPosY

      gsap.set(window, {
        scrollTo: calcScrollTo,
      })
    }
  }
}
