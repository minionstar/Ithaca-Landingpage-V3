/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-refresh/only-export-components */
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import {useContext, useEffect, useRef, useState} from "react"

import {useScroll} from "./useScroll"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

export function ScrollLayout({children}: any) {
  const [customWheelMultiplier, setWheelMultiplayer] = useState<number>(0.75)
  const [customTouchMultiplier, setTouchMultiplier] = useState<number>(0.5)
  const [customSmooth, setSmooth] = useState<boolean>(true)

  const isEnableScroll = useScroll((state) => state.isEnableScroll)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = useRef<any>()

  useEffect(() => {
    // !IMPORTANT: uncomment line down here, this will enable Lenis scroll only on mobile device.
    // And you can use gsap scroll on desktop instead
    // if (window.innerWidth < 576) {
    lenis.current = new Lenis({
      wheelMultiplier: customWheelMultiplier,
      smoothTouch: true,
      touchMultiplier: customTouchMultiplier,
      // // @ts-expect-error
      // wrapper: wrapper.current,
      // // @ts-expect-error
      // content: content.current,
      lerp: window.innerWidth > 1024 ? 0.05 : 0.05,
      // duration: 1.2,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: customSmooth,
      infinite: false,
    })
    lenis.current.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.current.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
    // }
    return () => {
      lenis.current?.destroy()
    }
  }, [customWheelMultiplier, customTouchMultiplier, customSmooth])

  useEffect(() => {
    if (isEnableScroll) {
      lenis.current?.stop()
      enableNativeScroll(false)
    } else {
      lenis.current?.start()
      enableNativeScroll(true)
    }
  }, [isEnableScroll])

  return (
    <ScrollContext.Provider
      value={{
        setWheelMultiplayer,
        setTouchMultiplier,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const enableNativeScroll = (value: boolean) => {
  if (!document) {
    return
  }
  const html = document.querySelector("html")
  if (!html) {
    return
  }
  if (!value) {
    html.style.position = "relative"
    html.style.overflow = "hidden"
    html.style.height = "100%"
  } else {
    html.style.removeProperty("position")
    html.style.removeProperty("overflow")
    html.style.removeProperty("height")
  }
}
