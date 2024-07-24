/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-empty-pattern */
import Bg from "/images/architecture/bg.png"
import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {TextPlugin} from "gsap/all"
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react"

import {SectionTitle} from "@/shared/components/SectionTitle"
import {sectionAnim} from "@/shared/hooks/sectionAnim"

import styles from "./Architecture.module.scss"
import {dataArchitecture} from "./lib/dataArchitecture"
import {ArchitectureItem} from "./ui/architecture-item"

gsap.registerPlugin(TextPlugin)

const Architecture = forwardRef(({}, outerRef) => {
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)
  const gradient = useRef<HTMLDivElement>(null)
  const refTitle = useRef<HTMLDivElement>(null)

  sectionAnim(refRoot, refRootInner)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: refTitle.current,
      start: `top top+=80%`,
      end: `top top+=70%`,
      scrub: 1,
      // markers: true,
      animation: gsap.timeline().fromTo(
        refTitle.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ),
    })
  }, [])

  useImperativeHandle(outerRef, () => refRoot.current)
  return (
    <section
      id="architecture"
      ref={refRoot}
      className={clsx("section", styles.architecture)}
    >
      <div className={styles.architecture_inner} ref={refRootInner}>
        <div ref={gradient} className={styles.architectureGradient}>
          <img src={Bg} alt="" />
        </div>
        <div className="container">
          <div className={styles.architectureWrapper}>
            <SectionTitle title="Architecture" />
            <div className={styles.Architecture_items}>
              {dataArchitecture.map((e, i) => (
                <ArchitectureItem title={e.title} num={i + 1} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Architecture.displayName = "Architecture"
export {Architecture}
