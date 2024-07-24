import clsx from "clsx"
import gsap from "gsap"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import {IconLogo} from "@/shared/icons/logo"

import styles from "./Ecosystem.module.scss"

// eslint-disable-next-line no-empty-pattern
const Ecosystem = forwardRef(({}, outerRef) => {
  const ref = useRef<HTMLElement | null>(null)
  useImperativeHandle(outerRef, () => ref.current)

  const progress = useRef<HTMLDivElement>(null)
  const perspective = useRef<HTMLDivElement>(null)
  const pText1 = useRef<HTMLDivElement>(null)
  const pText2 = useRef<HTMLDivElement>(null)
  const pText3 = useRef<HTMLDivElement>(null)
  const refClip = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // window.innerWidth > 768 &&
      //   ScrollTrigger.create({
      //     trigger: "#ecosystem",
      //     start: `top top+=12.5`,
      //     end:
      //       window.innerWidth > 768 ? `bottom+=10% bottom` : `bottom+=0% top`,
      //     pin: true,
      //     markers: true,
      //   })

      // window.innerWidth < 768 &&
      //   ScrollTrigger.create({
      //     trigger: refClip.current,
      //     start: `top bottom-=100px`,
      //     end: `500px top`,
      //     pin: true,
      //     scrub: 0.01,
      //     markers: true,
      //   })

      ScrollTrigger.create({
        trigger: "#ecosystem",
        start: window.innerWidth > 1024 ? `top-=150% top` : `top-=100% top`,
        end:
          window.innerWidth > 1024
            ? `bottom bottom-=150%`
            : `bottom+=200% bottom`,
        scrub: 0.01,
        // markers: true,
        onUpdate: (self) => {
          if (progress.current) {
            progress.current.style.height = `${self.progress * 100}%`
          }

          setScrollProgress(self.progress)
        },
        animation:
          window.innerWidth > 1024
            ? gsap.timeline().to(
                "#ecosystem-perspective",
                {
                  yPercent: -90,
                  translateZ: -((window.innerWidth / 100) * 100),
                },
                0,
              )
            : gsap.timeline().to(
                "#ecosystem-perspective",
                {
                  yPercent: -90,
                  translateZ: -((window.innerWidth / 100) * 100),
                },
                0,
              ),
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (pText1.current && pText2.current && pText3.current) {
      if (window.innerWidth > 1024) {
        //start
        if (scrollProgress <= 0.28) {
          gsap.set(pText1.current, {
            opacity: 0,
          })
        }
        if (scrollProgress <= 0.35) {
          gsap.set(pText2.current, {
            opacity: 0,
          })
        }
        if (scrollProgress <= 0.4) {
          gsap.set(pText3.current, {
            opacity: 0,
          })
        }

        //middle
        if (scrollProgress > 0.28 && scrollProgress < 0.45) {
          gsap.set(pText1.current, {
            opacity: 1,
          })
        }

        if (scrollProgress > 0.35 && scrollProgress < 0.49) {
          gsap.set(pText2.current, {
            opacity: 1,
          })
        }

        if (scrollProgress > 0.4 && scrollProgress < 0.57) {
          gsap.set(pText3.current, {
            opacity: 1,
          })
        }

        //end
        if (scrollProgress >= 0.45) {
          gsap.set(pText1.current, {
            opacity: 0,
          })
        }
        if (scrollProgress >= 0.49) {
          gsap.set(pText2.current, {
            opacity: 0,
          })
        }
        if (scrollProgress >= 0.57) {
          gsap.set(pText3.current, {
            opacity: 0,
          })
        }
      } else {
        //start
        if (scrollProgress <= 0.15) {
          gsap.set(pText1.current, {
            opacity: 0,
          })
        }
        if (scrollProgress <= 0.2) {
          gsap.set(pText2.current, {
            opacity: 0,
          })
        }
        if (scrollProgress <= 0.25) {
          gsap.set(pText3.current, {
            opacity: 0,
          })
        }

        //middle
        if (scrollProgress > 0.15 && scrollProgress < 0.3) {
          gsap.set(pText1.current, {
            opacity: 1,
          })
        }

        if (scrollProgress > 0.2 && scrollProgress < 0.35) {
          gsap.set(pText2.current, {
            opacity: 1,
          })
        }

        if (scrollProgress > 0.25 && scrollProgress < 0.4) {
          gsap.set(pText3.current, {
            duration: 1,
            opacity: 1,
          })
        }

        //end
        if (scrollProgress >= 0.3) {
          gsap.set(pText1.current, {
            opacity: 0,
          })
        }
        if (scrollProgress >= 0.35) {
          gsap.set(pText2.current, {
            opacity: 0,
          })
        }
        if (scrollProgress >= 0.4) {
          gsap.set(pText3.current, {
            opacity: 0,
          })
        }
      }
    }
  }, [scrollProgress])

  return (
    <section
      ref={ref}
      id="ecosystem"
      className={clsx("section", styles.ecosystem)}
    >
      <div
        ref={perspective}
        id="ecosystem-perspective"
        className={styles.ecosystemPerspective}
      >
        <div ref={pText1} className={styles.ecosystemPerspectiveText}>
          <h1
            className={clsx(
              `${window.innerWidth > 1024 ? "scale-[1.2]" : "scale-[1.5]"}`,
            )}
          >
            The
          </h1>
          <br />
          <br />
          <div className={clsx(styles.ecosystem_logo)}>
            <IconLogo />
          </div>
          <br />
          <h1
            className={clsx(
              `${window.innerWidth > 1024 ? "scale-[1.2]" : "scale-[1.5]"}`,
            )}
          >
            Ecosystem
          </h1>
          <br />
          <br />
          <br />
          {window.innerWidth > 1024 ? (
            <h3 className="scale-[0.95]">will encompass</h3>
          ) : (
            <h2 className="scale-[0.95]">will encompass</h2>
          )}
        </div>
        <div ref={pText2} className={styles.ecosystemPerspectiveText}>
          <h4>An Option trading protocol</h4>
          <br />
          {window.innerWidth > 1024 && <br />}
          <h4>An algorithmic market maker</h4>
          <br />
          {window.innerWidth > 1024 && <br />}
          <h4>a collateral optimization engine</h4>
        </div>

        <div
          ref={pText3}
          className={clsx(styles.ecosystemPerspectiveText, "scale-[0.85]")}
        >
          <p className="body-28 rotate-x-[-125deg] font-light italic">
            Coming soon
          </p>
          <br />
          <p className="body-20 rotate-x-[-125deg] font-light italic capitalize">
            market cleaning consistent margin lending
            {window.innerWidth < 1024 && <br />}
            & liquidation mechanism <br />
            Decentralized protocol Governance
          </p>
        </div>
      </div>
    </section>
  )
})

Ecosystem.displayName = "Ecosystem"
export {Ecosystem}
