import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface IComingSoon {
  title: string
}

export const ComingSoon: FC<IComingSoon> = ({title}) => {
  return (
    <div className={clsx(styles.ComingSoon)}>
      <div className={clsx(styles.ComingSoon_inner)}>
        {title} Coming Soon...
      </div>
    </div>
  )
}
