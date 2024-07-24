/* eslint-disable no-empty-pattern */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react"

import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {IconLogo} from "@/shared/icons/logo"

import styles from "./MatchingEngine.module.scss"

const MatchingEngine = forwardRef(({}, outerRef) => {
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refPlayer = useRef<Player>(null)

  useImperativeHandle(outerRef, () => refRoot.current)

  const scroll = () => {
    if (refRoot.current) {
      const posY = refRoot.current.getBoundingClientRect().y
      const windowsHeight = window.innerHeight
      if (posY < windowsHeight && posY > -windowsHeight) {
        refPlayer.current?.play()
      } else {
        refPlayer.current?.pause()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", (event) => {
      scroll()
    })
  }, [])

  sectionAnim(refRoot, refRootInner)

  return (
    <section
      id="matching-engine"
      className={clsx("section", styles.matchingEngine)}
      ref={refRoot}
    >
      <div className={clsx(styles.matchingEngine_inner)} ref={refRootInner}>
        <div className={clsx(styles.matchingEngine_header)}>
          <div className={clsx(styles.matchingEngine_header_title)}>
            Matching Engine
          </div>
        </div>
        <Player
          className={clsx(styles.matchingEngine_player)}
          keepLastFrame
          ref={refPlayer}
          src={
            window.innerWidth > 1024
              ? "/lottiAnimations/matching-engine/matching-engine.json"
              : "/lottiAnimations/matching-engine/matching-engine-mob.json"
          }
        />
      </div>
    </section>
  )
})

MatchingEngine.displayName = "Matching Engine"
export {MatchingEngine}
