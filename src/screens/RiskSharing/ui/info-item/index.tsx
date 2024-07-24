import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useEffect, useRef, useState} from "react"

import {AccordionButton} from "@/shared/icons/accordionButton"

import styles from "./index.module.scss"

interface IInfoItem {
  title: string
  subtitle?: string
  items?: {
    text: string
    fake?: React.ReactNode
  }[]
  index: number
}

export const InfoItem: FC<IInfoItem> = ({title, subtitle, items, index}) => {
  const [isActive, setActive] = useState<boolean>(false)
  const refDescriptionWords = useRef<HTMLSpanElement[] | null[]>([])

  const refDes = useRef<HTMLDivElement>(null)

  const tl = useRef<GSAPTimeline>()

  const {contextSafe} = useGSAP(() => {
    tl.current = gsap.timeline({
      defaults: {
        delay: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
    })

    refDescriptionWords.current.map((e, i) => {
      if (tl.current) {
        tl.current.fromTo(
          e,
          {
            opacity: 0,
            yPercent: 50,
          },
          {
            opacity: 1,
            yPercent: 0,
          },
          "<5%",
        )
      }
    })
  })

  useEffect(() => {
    if (refDes.current) {
      if (tl.current) {
        if (tl.current.reversed() == true) {
          setTimeout(() => {
            if (tl.current) {
              tl.current.reversed(!tl.current.reversed())
            }
          }, 100)
        } else {
          tl.current.reversed(!tl.current.reversed())
        }
      }

      if (isActive) {
        let height = refDes.current.scrollHeight
        gsap.to(refDes.current, {
          height: height,
          marginTop: 25,
          duration: Number(tl.current?.duration()),
          ease: "power1.inOut",
        })
      } else {
        setTimeout(() => {
          gsap.to(refDes.current, {
            height: 0,
            marginTop: 0,
            duration: Number(tl.current?.duration()),
            ease: "power1.inOut",
          })
        }, 100)
      }
    }
  }, [isActive])

  return (
    <div
      className={clsx(styles.InfoItem, isActive && styles.active)}
      onClick={() => setActive((prev) => !prev)}
    >
      <div className={clsx(styles.InfoItem_half)}>
        <div className={clsx(styles.InfoItem_title)}>{title}</div>
        {subtitle && (
          <div className={clsx(styles.InfoItem_subtitle)}>{subtitle}</div>
        )}
        {items && (
          <div className={styles.InfoItem_description} ref={refDes}>
            {items.map((e, i) => (
              <p className={styles.InfoItem_description_item} key={i}>
                {e.text.split(/\s+/).map((el, ind) => (
                  <span
                    ref={(ref) => {
                      if (refDescriptionWords.current) {
                        refDescriptionWords.current[ind] = ref
                      }
                    }}
                    key={ind}
                  >
                    {el == "delta." ? (
                      <>
                        <span className={styles.fake}></span> delta.
                      </>
                    ) : (
                      el
                    )}
                  </span>
                ))}
                {e.fake && e.fake}
              </p>
            ))}
          </div>
        )}
      </div>

      {items && (
        <div className={clsx(styles.InfoItem_icon)}>
          <AccordionButton index={index} />
        </div>
      )}
    </div>
  )
}
