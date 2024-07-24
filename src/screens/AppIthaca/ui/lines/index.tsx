import clsx from "clsx"
import {FC, useRef} from "react"

import styles from "./index.module.scss"
import {LineItem} from "./ui/line-item"

interface ILines {}

export const Lines: FC<ILines> = () => {
  const refRoot = useRef<HTMLDivElement>(null)

  return (
    <div className={clsx(styles.Lines)} ref={refRoot}>
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <LineItem refRoot={refRoot} key={i} />
        ))}
    </div>
  )
}
