import clsx from "clsx"
import React, {FC} from "react"

import styles from "./index.module.scss"

interface IListItem {
  className: string
  title: React.ReactNode
}

export const ListItem: FC<IListItem> = ({className, title}) => {
  return (
    <div className={clsx(styles.ListItem)}>
      <div className={clsx(styles.ListItem_ring)} />
      <div className={clsx(styles.ListItem_title)}>{title}</div>
    </div>
  )
}
