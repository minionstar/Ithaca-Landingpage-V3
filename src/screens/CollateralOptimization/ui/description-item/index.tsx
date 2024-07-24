import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface IDescriptionItem {
  title: string
}

export const DescriptionItem: FC<IDescriptionItem> = ({title}) => {
  return <div className={clsx(styles.DescriptionItem)}>{title}</div>
}
