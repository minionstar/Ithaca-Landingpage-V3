import {useGSAP} from "@gsap/react"
import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import Cookies from "js-cookie"
import numeral from "numeral"
import {FC, createElement, useContext, useEffect, useRef, useState} from "react"

import styles from "./index.module.scss"
import {preloader} from "./preloader"
import {MainContext} from "@/app/providers/MainContext"

interface IPreloader {}

export const Preloader: FC<IPreloader> = () => {
  const {setLoad, timeLoad} = useContext(MainContext)

  const refPlayer = useRef<Player>(null)
  const refPlayerBox = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState<number>(0)
  const [percent, setPercent] = useState(0)

  // useEffect(() => {
  //   if (progress === 100) {
  //     refPlayerBox.current && refPlayerBox.current.classList.add(styles.hidden)
  //     setTimeout(() => {
  //       setLoad(true)
  //     }, 2000)
  //   }
  // }, [progress])

  // useGSAP(() => {
  //   const cookiesIsLoading = Cookies.get("isLoading")

  //   if (!cookiesIsLoading) {
  //     setTimeout(() => {
  //       Cookies.set("isLoading", "true", {
  //         expires: 1 / 288,
  //         path: "/",
  //       })
  //     }, 2000)
  //   }

  //   const number = {
  //     value: 0,
  //   }

  //   gsap.to(number, {
  //     value: 100,
  //     duration: cookiesIsLoading ? 5 : 15,
  //     snap: {
  //       value: 0.01,
  //     },
  //     ease: "power4.inOut",
  //     onUpdate() {
  //       setProgress(number.value)
  //     },
  //   })
  // })

  useEffect(() => {
    if (window.innerWidth > 768) {
      if (percent >= 20) {
        setTimeout(() => {
          refPlayerBox.current &&
            refPlayerBox.current.classList.add(styles.hidden)
          setTimeout(() => {
            setLoad(true)
          }, 1600)
        }, 5000)
      }
    } else {
      if (percent >= 70) {
        refPlayerBox.current &&
          refPlayerBox.current.classList.add(styles.hidden)
        setTimeout(() => {
          setLoad(true)
        }, 2000)
      }
    }
  }, [percent])

  useEffect(() => {
    preloader({
      onChange(percentage: any, complete: any) {
        setPercent(Number(percentage.toFixed(2)))
      },
    })
  }, [])

  const renderTextProgress = (text: string) => {
    let dotIndex = text.indexOf(".")

    if (dotIndex !== -1) {
      let textBeforeDot = text.substring(0, dotIndex)
      let textAfterDot = text.substring(dotIndex)

      return (
        <>
          {textBeforeDot}
          <span>{textAfterDot}%</span>
        </>
      )
    } else {
      return (
        <>
          {text}
          <span>%</span>
        </>
      )
    }
  }

  return (
    <div className={clsx(styles.Preloader)} ref={refPlayerBox}>
      <img className="bg_noise" src="/images/noise.png" alt="" />
      <div className={clsx(styles.Preloader_logo)}>
        <Player
          className={clsx(styles.Preloader_player, styles.logo)}
          autoplay
          keepLastFrame
          src="/lottiAnimations/preloader/preloader-logo.json"
        />
      </div>
      <div className={clsx(styles.Preloader_planet)}>
        <Player
          className={clsx(styles.Preloader_player)}
          autoplay
          ref={refPlayer}
          keepLastFrame
          src="/lottiAnimations/preloader/preloader-planet.json"
        >
          {/* <div className={clsx(styles.Preloader_progress)}>
            {renderTextProgress(progress.toString())}
          </div> */}
          <div className={clsx(styles.Preloader_progress)}>
            {renderTextProgress(percent.toString())}
          </div>
        </Player>
      </div>
    </div>
  )
}
