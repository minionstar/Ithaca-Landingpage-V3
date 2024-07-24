import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface IOptionItem {
  title: string
}

export const OptionItem: FC<IOptionItem> = ({title}) => {
  return <div className={clsx(styles.OptionItem)}>{title}</div>
}
