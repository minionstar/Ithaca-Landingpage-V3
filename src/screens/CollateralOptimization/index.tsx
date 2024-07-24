import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef, useState} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionSubtitle} from "@/shared/components/SectionSubtitle"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataDescriptions} from "./lib/dataDescriptions"
import {dataOptions} from "./lib/dataOptions"
import {DescriptionItem} from "./ui/description-item"
import {OptionItem} from "./ui/option-item"

interface ICollateralOptimization extends ISwiperSection {}

export const CollateralOptimization: FC<ICollateralOptimization> = ({
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
      id="collateral-optimization"
      className={clsx("section", styles.CollateralOptimization)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div
        className={clsx(styles.CollateralOptimization_inner)}
        ref={refRootInner}
      >
        <div className={clsx(styles.CollateralOptimization_playerBoxHeader)}>
          <Player
            className={clsx(styles.CollateralOptimization_player, styles.top)}
            keepLastFrame
            ref={refPlayer_1}
            src={`/lottiAnimations/collateral-optimization/collateral-optimization-text${
              window.innerWidth > 1024
                ? ""
                : window.innerWidth > 560
                  ? "-tab"
                  : "-mob"
            }.json`}
          />
        </div>
        <div
          className={clsx(styles.CollateralOptimization_playerBox)}
          ref={refPlayerBox_2}
        >
          <Player
            className={clsx(
              styles.CollateralOptimization_player,
              styles.bottom,
            )}
            onEvent={(event) => {
              if (event === "frame") handleEnterFrame()
            }}
            ref={refPlayer_2}
            loop={true}
            src={`/lottiAnimations/collateral-optimization/collateral-optimization-elements${
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
