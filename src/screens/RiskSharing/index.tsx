import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionSubtitle} from "@/shared/components/SectionSubtitle"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataInfo} from "./lib/dataInfo"
import {InfoItem} from "./ui/info-item"

interface IRiskSharing extends ISwiperSection {}

export const RiskSharing: FC<IRiskSharing> = ({isSectionActive}) => {
  const refVideo_1 = useRef<HTMLVideoElement>(null)
  const refVideo_2 = useRef<HTMLVideoElement>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refVideo_1.current?.play()
      refVideo_2.current?.play()
    } else {
      refVideo_1.current?.pause()
      refVideo_2.current?.pause()
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
      id="risk-sharing"
      className={clsx("section", styles.RiskSharing)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.RiskSharing_inner)} ref={refRootInner}>
        <div className={clsx(styles.RiskSharing_header)}>
          {/* <SectionSubtitle title="Characteristics" span="02" isIcon={true} /> */}
          <SectionTitle title="Risk sharing building blocks" />
        </div>
        <div className={clsx(styles.RiskSharing_content)}>
          <div className={clsx(styles.RiskSharing_info)}>
            {dataInfo.map((e, i) => (
              <InfoItem {...e} index={i} key={i} />
            ))}
          </div>
          <div className={clsx(styles.RiskSharing_lotties)}>
            <div className={clsx(styles.RiskSharing_lotties_box)}>
              <img
                className={clsx(styles.RiskSharing_lotties_bg)}
                src="/images/risk-sharing/lottie-bg-l.png"
                alt=""
              />
              <video
                className={clsx(styles.RiskSharing_lotties_item, styles.left)}
                muted={true}
                playsInline={true}
                loop
                preload="auto"
                ref={refVideo_1}
              >
                <source
                  src="/videos/riskSharing/risk-sharing-left.webm"
                  type="video/webm"
                />
                <source
                  src="/videos/riskSharing/risk-sharing-left.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className={clsx(styles.RiskSharing_lotties_box)}>
              <video
                className={clsx(styles.RiskSharing_lotties_item)}
                muted={true}
                playsInline
                loop
                preload="auto"
                ref={refVideo_2}
              >
                <source
                  src={"/videos/riskSharing/risk-sharing-right.webm"}
                  type="video/webm"
                />
                <source
                  src={"/videos/riskSharing/risk-sharing-right.mp4"}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
