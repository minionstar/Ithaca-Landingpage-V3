import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionSubtitle} from "@/shared/components/SectionSubtitle"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {IconBlocks} from "@/shared/icons/blocks"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"

interface IMixedInteger extends ISwiperSection {}

export const MixedInteger: FC<IMixedInteger> = ({isSectionActive}) => {
  const refVideo = useRef<HTMLVideoElement>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refVideo.current?.play()
    } else {
      refVideo.current?.pause()
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
      id="mixed-integer"
      className={clsx("section", styles.MixedInteger)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.MixedInteger_inner)} ref={refRootInner}>
        <div className={clsx(styles.MixedInteger_info)}>
          <div className={clsx(styles.MixedInteger_header)}>
            {/* <SectionSubtitle title="Characteristics" span="04" isIcon /> */}
            <SectionTitle
              className={clsx(styles.MixedInteger_header_title)}
              title="Mixed Integer Linear Programming Optimization"
            />
          </div>
          <div className={clsx(styles.MixedInteger_footer)}>
            <div className={clsx(styles.MixedInteger_footer_icon)}>
              <IconBlocks />
            </div>
            <div className={clsx(styles.MixedInteger_footer_title)}>
              MILP allows for searching of clearing prices and associated sets
              of consistent orders satisfying these prices that maximize
              executed volume and satisfy best execution requirements in the
              presence of conditional orders and with automatic replication.
            </div>
            <div className={clsx(styles.MixedInteger_footer_subtitle)}>
              <div className={clsx(styles.MixedInteger_footer_subtitle_title)}>
                Algorithmic Precision
              </div>
              <div className={clsx(styles.MixedInteger_footer_subtitle_text)}>
                MILP utilizes advanced heuristics to perform an efficient search
                of the solution space using the branch and bound algorithm for
                binary integer constraints.
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.MixedInteger_player)}>
          <video
            className={clsx(styles.MixedInteger_player_item)}
            muted={true}
            playsInline
            loop
            preload="auto"
            ref={refVideo}
          >
            <source
              src={"/videos/mixed-integer/mixed-integer.webm"}
              type="video/webm"
            />
            <source
              src={"/videos/mixed-integer/mixed-integer.mp4"}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  )
}
