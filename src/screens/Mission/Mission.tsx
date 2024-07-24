/* eslint-disable no-empty-pattern */
import clsx from "clsx"
import gsap from "gsap"
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef} from "react"

import styles from "./Mission.module.scss"

const Mission = forwardRef(({}, outerRef) => {
  const ref = useRef<HTMLElement | null>(null)
  useImperativeHandle(outerRef, () => ref.current)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split1 = new SplitText("#mission-text-1", {
        type: "words",
      })
      const split2 = new SplitText("#mission-text-2", {
        type: "words",
      })
      const split3 = new SplitText("#mission-text-3", {
        type: "words",
      })

      ScrollTrigger.create({
        trigger: "#mission",
        start: `top top`,
        end: `bottom bottom-=500%`,
        pin: true,
        scrub: 1,
        animation: gsap
          .timeline()
          .to(split1.words, {
            opacity: 1,
            yPercent: -125,
            delay: function (index) {
              return index * 0.0125
            },
            duration: 1,
          })
          .to(
            split1.words,
            {
              opacity: 0,
              yPercent: 0,
              delay: function (index) {
                return index * 0.0125
              },
              duration: 1,
            },
            1,
          )
          .to(
            split2.words,
            {
              opacity: 1,
              yPercent: -100,
              delay: function (index) {
                return index * 0.0125
              },
              duration: 1,
            },
            2,
          )
          .to(
            split2.words,
            {
              opacity: 0,
              yPercent: 50,
              delay: function (index) {
                return index * 0.0125
              },
              duration: 1,
            },
            3,
          )
          .to(
            split3.words,
            {
              opacity: 1,
              yPercent: -50,
              delay: function (index) {
                return index * 0.0125
              },
              duration: 1,
            },
            4,
          )
          .to(
            split3.words,
            {
              opacity: 0,
              yPercent: 50,
              delay: function (index) {
                return index * 0.0125
              },
              duration: 1,
            },
            5,
          ),
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="mission" ref={ref} className={clsx("section", styles.mission)}>
      <div className={styles.missionAnimation}>
        <div id="mission-text-1" className={styles.missionText}>
          {window.innerWidth > 768 ? (
            <h3 className="text-center font-normal">Mission</h3>
          ) : (
            <h2 className="text-center font-normal">Mission</h2>
          )}
        </div>
        <div id="mission-text-2" className={styles.missionText}>
          <h4 className="text-center">
            {window.innerWidth > 768 ? (
              <>
                Build permissionless cross-chain <br />
                infrastructure enabling optimal risk <br />
                sharing across time and event horizons.
              </>
            ) : (
              <>
                Build permissionless cross-chain infrastructure enabling optimal
                risk sharing across time and event horizons.
              </>
            )}
          </h4>
        </div>
        <div id="mission-text-3" className={styles.missionText}>
          <h4 className="text-center">
            {window.innerWidth > 768 ? (
              <>
                Allow for instant deployment of &#8216;liquidity self- <br />{" "}
                enhancing' complete, composable option, option <br /> strategy,
                structured product and lending <br /> markets, on any
                underlying.
              </>
            ) : (
              <>
                Allow for instant deployment of &#8216;liquidity self-enhancing'
                complete, composable option, option strategy, structured product
                and lending markets, on any underlying.
              </>
            )}
          </h4>
        </div>
      </div>
    </section>
  )
})

Mission.displayName = "Mission"
export {Mission}
