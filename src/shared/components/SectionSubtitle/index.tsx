import clsx from "clsx"
import {FC} from "react"

import {IconStroke} from "@/shared/icons/stroke"

import styles from "./index.module.scss"

interface ISectionSubtitle {
  title: string
  span?: string
  isIcon?: boolean
  className?: string
}

export const SectionSubtitle: FC<ISectionSubtitle> = ({
  title,
  span,
  isIcon = false,
  className,
}) => {
  return (
    <div className={clsx(styles.SectionSubtitle, className)}>
      {title}
      {span && <span>{span}</span>}
      {isIcon && <IconStroke />}
    </div>
  )
}
