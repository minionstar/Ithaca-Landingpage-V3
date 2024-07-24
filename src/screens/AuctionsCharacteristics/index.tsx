import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import {FC, useEffect, useRef, useState} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"

interface IAuctionsCharacteristics extends ISwiperSection {}

export const AuctionsCharacteristics: FC<IAuctionsCharacteristics> = ({
  isSectionActive,
}) => {
  const refPlayer_1 = useRef<Player>(null)
  const refPlayer_2 = useRef<Player>(null)
  const refPlayerBox_2 = useRef<HTMLDivElement>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState<number>(0)

  const handleEnterFrame = () => {
    let instancePlayer = refPlayer_2.current?.state.instance
    if (instancePlayer) {
      const calculatedProgress =
        (instancePlayer?.currentFrame / instancePlayer?.totalFrames) * 100
      setProgress(calculatedProgress)
    }
  }

  useEffect(() => {
    if (refPlayerBox_2.current) {
      if (progress > 95) {
        refPlayerBox_2.current.classList.add(styles.hidden)
      } else {
        refPlayerBox_2.current.classList.remove(styles.hidden)
      }
    }
  }, [progress])

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refPlayer_1.current?.play()
      refPlayer_2.current?.play()
    } else {
      refPlayer_1.current?.pause()
      refPlayer_2.current?.pause()
    }
  }

  const currentSection = sectionActive()

  sectionAnim(refRoot, refRootInner, currentSection)

  const handleActive = (isSectionActive: boolean) => {
    controlPlayer(isSectionActive)
  }

  useEffect(() => {
    handleActive(currentSection.isActive)
  }, [currentSection.isActive])

  if (isSectionActive === true || isSectionActive === false) {
    useEffect(() => {
      handleActive(isSectionActive)
    }, [isSectionActive])
  }

  return (
    <section
      id="auctions-characteristics"
      className={clsx("section", styles.AuctionsCharacteristics)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div
        className={clsx(styles.AuctionsCharacteristics_inner)}
        ref={refRootInner}
      >
        <Player
          className={clsx(styles.AuctionsCharacteristics_player, styles.top)}
          keepLastFrame
          ref={refPlayer_1}
          src={`/lottiAnimations/auctions-characteristics/auctions-characteristics-text${
            window.innerWidth > 1024
              ? ""
              : window.innerWidth > 560
                ? "-tab"
                : "-mob"
          }.json`}
        />
        <div
          className={clsx(styles.AuctionsCharacteristics_playerBox)}
          ref={refPlayerBox_2}
        >
          <Player
            className={clsx(
              styles.AuctionsCharacteristics_player,
              styles.bottom,
            )}
            onEvent={(event) => {
              if (event === "frame") handleEnterFrame()
            }}
            ref={refPlayer_2}
            loop={true}
            src={`/lottiAnimations/auctions-characteristics/auctions-characteristics-elements${
              window.innerWidth > 1024
                ? ""
                : window.innerWidth > 560
                  ? "-tab"
                  : "-mob"
            }.json`}
          />
        </div>
      </div>
    </section>
  )
}
