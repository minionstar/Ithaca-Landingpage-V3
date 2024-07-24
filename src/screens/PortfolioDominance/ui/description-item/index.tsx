import clsx from "clsx"
import React, {FC, RefObject} from "react"

import styles from "./index.module.scss"

interface IDescriptionItem {
  title: React.ReactNode
  text: React.ReactNode
  refForward: RefObject<HTMLDivElement[]>
  index: number
}

export const DescriptionItem: FC<IDescriptionItem> = ({
  title,
  text,
  refForward,
  index,
}) => {
  return (
    <div
      className={clsx(styles.DescriptionItem)}
      ref={(ref) => {
        if (ref && refForward.current) {
          refForward.current[index] = ref
        }
      }}
    >
      <div className={clsx(styles.DescriptionItem_title)}>{title}</div>
      <div className={clsx(styles.DescriptionItem_text)}>{text}</div>
    </div>
  )
}
