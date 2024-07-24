import clsx from "clsx"
import {useContext} from "react"

import {dataSocials} from "@/screens/Footer/lib/dataSocials"
import {Policy} from "@/screens/Footer/ui/policy"
import {SocialItem} from "@/screens/Footer/ui/social-item"

import {dataNav} from "@/data/dataNav"

import {scrollTo} from "@/shared/hooks/scrollTo"

import styles from "./Menu.module.scss"
import {MainContext} from "@/app/providers/MainContext"
import {ScrollContext} from "@/app/providers/ScrollContext"

export const Menu = () => {
  const {setWheelMultiplayer, setTouchMultiplier} = useContext(ScrollContext)
  const {menuActive, setMenuActive} = useContext(MainContext)

  const handleLink = (href: string) => {
    setMenuActive(false)
    scrollTo(setWheelMultiplayer, setTouchMultiplier, href)
  }

  return (
    <menu className={clsx(styles.menu, menuActive && styles.active)}>
      <div className="container">
        <div className={styles.menu_wrapper}>
          <div className={styles.menu_wrapper_header}>
            <span className={clsx(styles.menu_label)}>menu</span>
            <ul className={styles.menu_list}>
              {dataNav.map((link, idx) => (
                <li className={styles.menu_link} key={idx}>
                  <a
                    onClick={() => {
                      if (link.href) {
                        handleLink(link.href)
                      }
                    }}
                  >
                    <div className={styles.menu_link_header}>
                      <span
                        className={clsx(
                          "dalek-font",
                          styles.menu_link_header_num,
                        )}
                      >
                        / 00{idx + 1}
                      </span>
                      {link.title}
                    </div>

                    <svg
                      className={styles.arrow}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8.80597V6C4 4.89543 4.89543 4 6 4H21.309C22.3664 4 23.3808 4.41869 24.1304 5.16453L26.5752 7.59719C27.3609 8.37904 27.3609 9.65081 26.5752 10.4327L21.16 15.8209L26.4614 21.0959C27.2158 21.8466 27.64 22.867 27.64 23.9314V26C27.64 27.1046 26.7446 28 25.64 28H22.8C21.6954 28 20.8 27.1046 20.8 26V16.0597L10.2107 26.5963C9.43045 27.3727 8.16955 27.3727 7.38932 26.5963L5.42482 24.6416C4.63907 23.8598 4.63907 22.588 5.42483 21.8061L15.6213 11.6604C15.9375 11.3458 15.7147 10.806 15.2686 10.806H6C4.89543 10.806 4 9.91054 4 8.80597Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <svg
                    className={styles.underline}
                    preserveAspectRatio="none"
                    width="355"
                    height="6"
                    viewBox="0 0 355 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 3H354" stroke="#3F3F3F" strokeLinecap="round" />
                    <circle
                      cx="13"
                      cy="3"
                      r="2.5"
                      fill="#222222"
                      stroke="#5E5E5E"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.menu_wrapper_footer}>
            <div className={styles.menu_wrapper_footer_socials}>
              {dataSocials.map((e, i) => (
                <SocialItem {...e} isSmall key={i} />
              ))}
            </div>
            <Policy />
          </div>
        </div>
      </div>
    </menu>
  )
}
