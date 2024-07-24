import {Player} from "@lottiefiles/react-lottie-player"
import clsx from "clsx"
import gsap from "gsap"
import {FC, useContext, useEffect, useRef} from "react"

import {dataNav} from "@/data/dataNav"

import {CanvasStars} from "@/shared/components/CanvasStars"
import {sectionActive} from "@/shared/hooks/sectionActive"
import {sectionAnim} from "@/shared/hooks/sectionAnim"
import {IconLogo} from "@/shared/icons/logo"
import {ISwiperSection} from "@/shared/types/swiperSection.interface"

import styles from "./index.module.scss"
import {dataResources} from "./lib/dataResources"
import {dataSocials} from "./lib/dataSocials"
import {NavItem} from "./ui/nav-item"
import {Policy} from "./ui/policy"
import {SocialItem} from "./ui/social-item"
import {MainContext} from "@/app/providers/MainContext"

interface IFooter extends ISwiperSection {}

const AuditedBy = () => {
  return (
    <>
      <div className={clsx(styles.Footer_title)}>Investors</div>
      <div className={clsx(styles.Footer_sponsors_container)}>
        <img
          className={clsx(styles.Footer_sponsor_logo)}
          src="/images/footer/wintermute.png"
          alt="Wintermute logo"
        />
        <img
          className={clsx(styles.Footer_sponsor_logo)}
          src="/images/footer/cumberland.png"
          alt="Cumberland logo"
        />
        <img
          className={clsx(styles.Footer_sponsor_logo)}
          src="/images/footer/room40ventures.png"
          alt="Room40 Ventures logo"
        />
        <img
          className={clsx(styles.Footer_sponsor_logo)}
          src="/images/footer/ghaf.png"
          alt="Ghaf Capital Partners logo"
        />
      </div>
      <div className={clsx(styles.Footer_title, styles.Footer_title_gap)}>
        Audited by
      </div>
      <div className={clsx(styles.Footer_logo_container)}>
        <div className="flex flex-row gap-4 items-center">
          <img
            className={clsx(styles.Footer_audit_logo)}
            src="/images/footer/halborn_logo.png"
            alt="Halborn logo"
          />
          <div>
            <a
              className={clsx(styles.Footer_report)}
              target="_blank"
              href="https://bit.ly/halborn_ithaca"
            >
              View Smart Contract Audit
            </a>
            <a
              className={clsx(styles.Footer_report)}
              target="_blank"
              href="https://bit.ly/halborn_ithaca2"
            >
              View Backend PenTest Audit
            </a>
          </div>
        </div>
        <div className="flex flex-row gap gap-4 items-center">
          <img
            className={clsx(styles.Footer_audit_logo)}
            src="/images/footer/quantstamp_logo.png"
            alt="Quantstamp logo"
          />
          <a
            className={clsx(styles.Footer_report)}
            href="https://certificate.quantstamp.com/full/ithaca-finance/8cacdbf3-9f47-4135-854d-1d004abad065/index.html"
          >
            View Smart Contract Audit
          </a>
        </div>
      </div>
    </>
  )
}

export const Footer: FC<IFooter> = ({isSectionActive}) => {
  const {setScrollDownPos} = useContext(MainContext)

  const refPlayer = useRef<Player>(null)
  const refRoot = useRef<HTMLDivElement>(null)
  const refRootInner = useRef<HTMLDivElement>(null)

  const controlPlayer = (isActive: boolean) => {
    if (isActive) {
      refPlayer.current?.play()
      setScrollDownPos("none")
    } else {
      refPlayer.current?.pause()
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
      id="footer"
      className={clsx("section", styles.Footer)}
      ref={refRoot}
    >
      {window?.innerWidth > 1024 && (
        <>
          <CanvasStars />
          <img className="bg_noise_absolute" src="/images/noise.png" alt="" />
        </>
      )}
      <div ref={refRootInner} className={clsx(styles.Footer_container)}>
        <div
          className={`${clsx(
            styles.Footer_audit,
            styles.Footer_audit_small_container,
          )}`}
        >
          <AuditedBy />
        </div>

        <div className={clsx(styles.Footer_inner)}>
          <div className={clsx(styles.Footer_left)}>
            <div
              className={`${clsx(
                styles.Footer_audit,
                styles.Footer_audit_big_container,
              )}`}
            >
              <AuditedBy />
            </div>
            <div className={clsx(styles.Footer_menu_wrapper)}>
              <div className={clsx(styles.Footer_half, styles.header)}>
                <div className={clsx(styles.Footer_title)}>About us</div>
                <div className={clsx(styles.Footer_nav)}>
                  {dataNav.map((e, i) => (
                    <NavItem {...e} key={i} />
                  ))}
                </div>
              </div>
              <div className={clsx(styles.Footer_half, styles.header)}>
                <div className={clsx(styles.Footer_title)}>Resources</div>
                <div className={clsx(styles.Footer_nav)}>
                  {dataResources.map((e, i) => (
                    <SocialItem {...e} key={i} />
                  ))}
                </div>
              </div>
              <div className={clsx(styles.Footer_half, styles.header)}>
                <div className={clsx(styles.Footer_title)}>Community</div>
                <div className={clsx(styles.Footer_socials)}>
                  {dataSocials.map((e, i) => (
                    <SocialItem {...e} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className={clsx(styles.Footer_copyright)}>
              <span className={clsx(styles.Copyright_text)}>
                © Copyright {new Date().getFullYear()} Ithaca
              </span>
              <Policy />
            </div>
          </div>
          <div className={clsx(styles.Footer_lottie)}>
            <IconLogo className={clsx(styles.Icon_logo)} />
            <Player
              className={clsx(styles.Footer_lottie_player)}
              ref={refPlayer}
              loop
              src="/lottiAnimations/footer-logo.json"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
