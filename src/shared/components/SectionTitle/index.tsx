import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface ISectionTitle {
  title: string
  className?: string
}

export const SectionTitle: FC<ISectionTitle> = ({title, className}) => {
  return <div className={clsx(styles.SectionTitle, className)}>{title}</div>
}
