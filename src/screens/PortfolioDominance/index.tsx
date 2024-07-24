import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useLayoutEffect, useRef} from "react"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {IconBrackets} from "@/shared/icons/brackets"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataPortfolioDominance} from "./lib/dataPortfolioDominance"
import {DescriptionItem} from "./ui/description-item"

interface IPortfolioDominance extends ISwiperSection {}

export const PortfolioDominance: FC<IPortfolioDominance> = ({
  isSectionActive,
}) => {
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const refDescription = useRef<HTMLDivElement>(null)
  const refHeader = useRef<HTMLDivElement>(null)
  const refBrackets = useRef<HTMLDivElement[]>([])
  const refDes = useRef<HTMLDivElement[]>([])

  const getPos = (elem: HTMLDivElement) => {
    const {x, y, width, height} = elem.getBoundingClientRect()
    return {x, y, width, height}
  }

  const Animate = () => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
    })
    let tl2 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
    })

    let tl3 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 1.5,
        ease: "power2.inOut",
        // paused: true,
      },
    })

    let tl4 = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 1,
        ease: "power2.inOut",
        pause: true,
      },
    })

    if (refDescription.current && refRoot.current) {
      let {
        x: bracketsX,
        y: bracketsY,
        width: bracketsW,
        height: bracketsH,
      } = getPos(refBrackets.current[0])
      const {
        x: desX,
        y: desY,
        width: desW,
        height: desH,
      } = getPos(refDescription.current)

      const {
        x: rootX,
        y: rootY,
        width: rootW,
        height: rootH,
      } = getPos(refRoot.current)

      tl1.to(refBrackets.current[0], {
        y: desY - rootY,
        height: window.innerWidth > 1024 ? desH : desH / 2,
        width: window.innerWidth > 1024 ? "auto" : 25,
        onComplete: () => {
          bracketsW = getPos(refBrackets.current[0]).width
          setTimeout(() => {
            tl4.play(1)
          }, 1200)
        },
      })
      tl1.to(refBrackets.current[0], {
        x: window.innerWidth > 1024 ? desX - bracketsW * 2 : 20,
        width: window.innerWidth > 1024 ? "auto" : 15,
        height:
          window.innerWidth > 1024 ? desH : getPos(refDes.current[0]).height,
      })

      tl2.to(refBrackets.current[1], {
        y: desY - rootY + desY * 0.15,
        height: window.innerWidth > 1024 ? desH : desH / 2,
        width: window.innerWidth > 1024 ? "auto" : 25,
      })

      tl2.to(refBrackets.current[1], {
        x:
          window.innerWidth > 1024
            ? desX + desW + bracketsW * 1.5
            : rootW - 15 * 2,

        y:
          window.innerWidth > 1024
            ? desY - rootY
            : getPos(refDes.current[1]).y - rootY,
        height:
          window.innerWidth > 1024 ? desH : getPos(refDes.current[1]).height,
        width: window.innerWidth > 1024 ? "auto" : 15,
      })

      tl3.fromTo(
        refHeader.current,
        {
          opacity: 0,
          yPercent: 50,
        },
        {
          opacity: 1,
          yPercent: 0,
          delay: 1.5,
        },
      )

      refDes.current.map((e, i) => {
        tl4.fromTo(
          e,
          {
            opacity: 0,
            yPercent: 20,
          },
          {
            opacity: 1,
            yPercent: 0,
            delay: i == 0 ? 1.5 : 0,
          },
          "<50%",
        )
      })

      tl4.pause()
    }
  }

  const setDefaultStyles = () => {
    if (refRoot.current) {
      const {width: rootW, height: rootH} = getPos(refRoot.current)
      const {width: bracketsW, height: bracketsH} = getPos(
        refBrackets.current[0],
      )

      gsap.set(refBrackets.current[0], {
        x: rootW / 2 - bracketsW / 2,
        y: rootH / 2 - (bracketsH / 2) * 1.2,
        height: window.innerWidth > 1024 ? rootH / 2 : rootH / 3,
      })
      gsap.set(refBrackets.current[1], {
        x: rootW / 2 + bracketsW / 2,
        y: rootH / 2 - (bracketsH / 2) * 0.9,
        height: window.innerWidth > 1024 ? rootH / 2 : rootH / 3,
        // rotate: 180,
      })
    }
  }

  useLayoutEffect(() => {
    setDefaultStyles()
  }, [])

  const currentSection = sectionActive()

  sectionAnim(refRoot, refRootInner, currentSection)

  const handleActive = () => {
    currentSection.firstActive()
    Animate()
  }

  useEffect(() => {
    currentSection.isActive && !currentSection.isFirstActive && handleActive()
  }, [currentSection.isActive])

  if (isSectionActive === true || isSectionActive === false) {
    useEffect(() => {
      isSectionActive && !currentSection.isFirstActive && handleActive()
    }, [isSectionActive])
  }

  return (
    <section
      id="portfolio-dominance"
      className={clsx("section", styles.PortfolioDominance)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div className={clsx(styles.PortfolioDominance_inner)} ref={refRootInner}>
        <div className={clsx(styles.PortfolioDominance_header)} ref={refHeader}>
          {/* <SectionSubtitle title="Characteristics" span="05" isIcon /> */}
          <SectionTitle
            className={styles.PortfolioDominance_title}
            title="Portfolio Dominance"
          />
        </div>
        <div
          className={clsx(styles.PortfolioDominance_description)}
          ref={refDescription}
        >
          {dataPortfolioDominance.map((e, i) => (
            <DescriptionItem {...e} key={i} refForward={refDes} index={i} />
          ))}
        </div>
        <div className={clsx(styles.PortfolioDominance_brackets)}>
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div
                className={clsx(styles.PortfolioDominance_brackets_item)}
                key={i}
                ref={(ref) => {
                  if (ref) {
                    refBrackets.current[i] = ref
                  }
                }}
              >
                <IconBrackets />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
