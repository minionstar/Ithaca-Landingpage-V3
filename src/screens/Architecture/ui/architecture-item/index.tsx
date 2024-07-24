import clsx from "clsx"
import gsap from "gsap"
import TextPlugin from "gsap/TextPlugin"
import {FC, RefObject, useContext, useLayoutEffect, useRef} from "react"

import {scrollTo} from "@/shared/hooks/scrollTo"
import {IconArrow} from "@/shared/icons/arrow"

import styles from "./index.module.scss"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

gsap.registerPlugin(TextPlugin)

interface IArchitectureItem {
  title: string
  num: number
}

export const ArchitectureItem: FC<IArchitectureItem> = ({title, num}) => {
  const refRoot = useRef<HTMLDivElement>(null)
  const refLine = useRef<HTMLDivElement>(null)
  const refRing = useRef<HTMLDivElement>(null)
  const refTitle = useRef<HTMLDivElement>(null)

  const chars = [
    "$",
    "%",
    "^",
    "&",
    "*",
    ")",
    "(",
    "-",
    "_",
    "=",
    "+",
    "!",
    "@",
    "#",
    "|",
    "~",
    "<",
    ">",
    "?",
  ]

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  const getRandomChars = (count: number) => {
    let string = ""

    for (let i = 0; i < count; i++) {
      string += chars[getRandomInt(chars.length)]
    }

    return string
  }

  const AnimateWord = (word: string, refElem: RefObject<HTMLDivElement>) => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
      },
    })

    tl1.to(refElem.current, {
      innerText: getRandomChars(word.length),
      duration: 0,
    })

    tl1.to(
      refElem.current,
      {
        text: word,
        duration: 0.02 * word.length,
        delay: 0.1,
      },
      "<10%",
    )
  }

  const AnimateWordReverse = (
    word: string,
    refElem: RefObject<HTMLDivElement>,
  ) => {
    let tl1 = gsap.timeline({
      defaults: {
        delay: 0,
      },
    })

    Array(word.length)
      .fill(null)
      .map((e, i) => {
        const textInstance = word
        tl1.to(refElem.current, {
          text: `${textInstance.slice(0, word.length - 1 - i)}${getRandomChars(
            i,
          )}`,
          duration: 0.02,
        })
      })

    tl1.to(refElem.current, {
      text: word,
      duration: 0,
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // window.innerWidth > 768 &&
      setTimeout(() => {
        let tl = gsap.timeline({
          defaults: {
            delay: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          scrollTrigger: {
            trigger: refRoot.current,
            start: "top 95%", // when the top of the trigger hits the top of the viewport
            end: "top 70%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            // markers: true,
          },
        })

        tl.fromTo(
          refRoot.current,
          {
            opacity: 0,
            yPercent: 50,
          },
          {
            opacity: 1,
            yPercent: 0,
            onStart: () => AnimateWord(title, refTitle),
          },
        )
          .to(refTitle.current, {
            scrambleText: title,
          })
          .fromTo(
            refRing.current,
            {
              scale: 0,
            },
            {
              scale: 1,
            },
            "<50%",
          )
          .fromTo(
            refLine.current,
            {
              width: "0%",
            },
            {
              width: "100%",
            },
          )

        // let tl2 = gsap.timeline({
        //   defaults: {
        //     delay: 0,
        //     duration: 1,
        //     ease: "power2.inOut",
        //   },
        //   scrollTrigger: {
        //     trigger: refRoot.current,
        //     start: "top 100%", // when the top of the trigger hits the top of the viewport
        //     end: "top 40%", // end after scrolling 500px beyond the start
        //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //     // markers: true,
        //   },
        // })

        // tl2
        //   .fromTo(
        //     refRing.current,
        //     {
        //       scale: 0,
        //     },
        //     {
        //       scale: 1,
        //     },
        //     "<50%",
        //   )
        //   .fromTo(
        //     refLine.current,
        //     {
        //       width: "0%",
        //     },
        //     {
        //       width: "100%",
        //     },
        //   )
      }, 100)
    })

    return () => ctx.revert()
  }, [])

  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
  const {refSwiper} = useContext(MainContext)

  const handleLink = (href?: string | null, section?: number) => {
    if (href) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, href)
    } else if (section) {
      scrollTo(setWheelMultiplayer, setTouchMultiplier, null, {
        swiper: refSwiper,
        section: section,
      })
    }
  }

  return (
    <div
      className={clsx(styles.ArchitectureItem)}
      onMouseEnter={() => AnimateWord(title, refTitle)}
      onMouseLeave={() => AnimateWordReverse(title, refTitle)}
      ref={refRoot}
      onClick={() => {
        window.innerWidth > 768
          ? handleLink(null, 9)
          : handleLink("#architecture-ithaca")
      }}
    >
      <div className={clsx("dalek-font", styles.ArchitectureItem_num)}>
        {num < 10 ? `00${num}` : num < 100 ? `0${num}` : `${num}`}
      </div>
      <div className={clsx(styles.ArchitectureItem_inner)}>
        <div className={clsx(styles.ArchitectureItem_left)}>
          <div className={clsx(styles.ArchitectureItem_arrow)}>
            <IconArrow />
            <IconArrow />
          </div>
          <div>
            <div className={clsx(styles.ArchitectureItem_title)} ref={refTitle}>
              {title}
            </div>
          </div>
        </div>
        <div className={clsx(styles.ArchitectureItem_elem)}>
          <div
            className={clsx(styles.ArchitectureItem_elem_line)}
            ref={refLine}
          />
          <div
            className={clsx(styles.ArchitectureItem_elem_ring)}
            ref={refRing}
          />
        </div>
      </div>
    </div>
  )
}
