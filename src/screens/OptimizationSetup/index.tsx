import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionSubtitle} from "@/shared/components/SectionSubtitle"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {ListItem} from "@/shared/components/list-item"
import {ElementCubes} from "@/shared/elements/cubes"
import {ElementRings} from "@/shared/elements/rings"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataOptimizationSetup} from "./lib/dataOptimizationSetup"

interface IOptimizationSetup extends ISwiperSection {}

export const OptimizationSetup: FC<IOptimizationSetup> = ({
  isSectionActive,
}) => {
  const refPlayer = useRef<Player>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)

  sectionAnim(refRoot, refRootInner)

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refPlayer.current?.play()
    } else {
      refPlayer.current?.pause()
    }
  }

  if (isSectionActive === true || isSectionActive === false) {
    useEffect(() => {
      controlPlayer(isSectionActive)
    }, [isSectionActive])
  }

  return (
    <section
      id="optimization-setup"
      className={clsx("section", styles.OptimizationSetup)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.OptimizationSetup_inner)} ref={refRootInner}>
        <img
          className={clsx(
            styles.OptimizationSetup_stain,
            isSectionActive && styles.active,
          )}
          src="/images/oprimization-setup/stain.png"
          alt=""
        />
        <div className={clsx(styles.OptimizationSetup_left)}>
          <SectionTitle title="Optimization Setup" />
          <div className={clsx(styles.OptimizationSetup_lottie)}>
            <ElementCubes />
          </div>
        </div>
        <div className={clsx(styles.OptimizationSetup_info)}>
          <div className={clsx(styles.OptimizationSetup_info_title)}>
            Statically Replicable derivatives Decomposed into / Recomposed from
            RSBBs using put-call parity and funding-option equivalence
            relationships directly incorporated into matching engine.
          </div>
          <div className={clsx(styles.OptimizationSetup_info_subtitle)}>
            Binary options being among the RSBBs allows for direct solution to
            the hedging approximation required for digital risk.
          </div>
          <div className={clsx(styles.OptimizationSetup_info_items)}>
            {dataOptimizationSetup.map((e, i) => (
              <ListItem
                className={clsx(styles.OptimizationSetup_info_items_item)}
                {...e}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
