import {MutableRefObject} from "react"

export interface ISwiperSection {
  isSectionActive?: boolean
  ref?: MutableRefObject<HTMLDivElement | null> | null
}
