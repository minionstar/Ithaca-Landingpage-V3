import gsap from "gsap"
import {RefObject, useContext, useEffect} from "react"

import {scrollTo} from "./scrollTo"
import {ISectionActive} from "./sectionActive"
import {MainContext} from "@/app/providers/MainContext"

// export const sectionAnim = (
//   refRoot: RefObject<HTMLDivElement>,
//   refRootInner: RefObject<HTMLDivElement>,
// ) => {}

export const sectionAnim = (
  refRoot: RefObject<HTMLDivElement>,
  refRootInner: RefObject<HTMLDivElement>,
  currentSection?: ISectionActive,
) => {
  const {setScrollDownPos} = useContext(MainContext)
  const scroll = () => {
    if (
      refRoot.current &&
      refRoot.current.parentElement &&
      refRootInner.current
    ) {
      const innerParams = refRootInner.current.getBoundingClientRect()
      const posY = innerParams.y
      if (posY < innerParams.height / 2 && posY > -innerParams.height) {
        if (window.innerWidth > 1024) {
          switch (refRoot.current.id) {
            case "risk-sharing":
            case "app":
              setScrollDownPos("left")
              break

            case "footer":
              setScrollDownPos("none")
              break

            default:
              setScrollDownPos("right")
              break
          }
        } else {
          currentSection && currentSection.active()
        }
      } else {
        if (window.innerWidth > 1024) {
        } else {
          currentSection && currentSection.disable()
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", () => {
      scroll()
    })

    return () =>
      document.removeEventListener("scroll", () => {
        scroll()
      })
  }, [])

  window.innerWidth > 1024 ? useEffect(() => {}, []) : useEffect(() => {}, [])
}
