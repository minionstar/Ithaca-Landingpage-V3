import {useGSAP} from "@gsap/react"
import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useContext, useEffect, useRef, useState} from "react"

import {IconClose} from "@/shared/icons/close"

import styles from "./index.module.scss"
import {MainContext} from "@/app/providers/MainContext"

interface IArchitectureIthacaModal {}

export const ArchitectureIthacaModal: FC<IArchitectureIthacaModal> = ({}) => {
  const {isArchitectureModalActive, setArchitectureModalActive} =
    useContext(MainContext)

  const refModal = useRef<HTMLDivElement>(null)
  const refClose = useRef<HTMLDivElement>(null)
  const refPlayer_modal = useRef<Player>(null)

  const handleModal = () => {
    setArchitectureModalActive((prev: boolean) => !prev)
  }

  useEffect(() => {
    if (refPlayer_modal.current) {
      if (isArchitectureModalActive) {
        refPlayer_modal.current.play()
        if (refClose.current) refClose.current.style.pointerEvents = "all"
      } else {
        refPlayer_modal.current.pause()
        if (refClose.current) refClose.current.style.pointerEvents = "none"
      }
    }
    toggleTimeline(isArchitectureModalActive)
  }, [isArchitectureModalActive])

  const tl = useRef<GSAPTimeline>()

  const {contextSafe} = useGSAP(() => {
    tl.current = gsap.timeline().fromTo(
      refModal.current,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 0.8,
        ease: "power2.inOut",
      },
    )
  })

  const toggleTimeline = contextSafe((isReverse: boolean) => {
    if (tl.current) {
      tl.current.reversed(isReverse)
    }
  })

  return (
    <div className={clsx(styles.ArchitectureIthacaModal)} ref={refModal}>
      <div
        className={clsx(styles.ArchitectureIthacaModal_close)}
        onClick={() => {
          handleModal()
        }}
        ref={refClose}
      >
        <div className={clsx(styles.ArchitectureIthacaModal_close_text)}>
          Close
        </div>
        <div className={clsx(styles.ArchitectureIthacaModal_close_icon)}>
          <IconClose />
        </div>
      </div>
      <div className={clsx(styles.ArchitectureIthacaModal_lottie)}>
        <Player
          className={clsx(styles.ArchitectureIthacaModal_lottie_item)}
          ref={refPlayer_modal}
          loop={true}
          src={`/lottiAnimations/architecture-ithaca/architecture-ithaca-modal${
            window.innerWidth <= 1024 ? "-mob" : ""
          }.json`}
        />
      </div>
    </div>
  )
}
