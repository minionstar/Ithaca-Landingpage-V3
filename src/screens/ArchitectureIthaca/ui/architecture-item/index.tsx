import clsx from "clsx"
import {FC} from "react"

import {IconArrow} from "@/shared/icons/arrow"

import styles from "./index.module.scss"

interface IArchitectureItem {
  title: string
  handleModal?: false | (() => void)
  hover: (index: number) => void
  isModalActive: boolean
  index: number
}

export const ArchitectureItem: FC<IArchitectureItem> = ({
  title,
  handleModal,
  isModalActive,
  hover,
  index,
}) => {
  return (
    <div
      className={clsx(
        styles.ArchitectureItem,
        // handleModal && styles.handle
      )}
      onClick={() => {
        hover(index)
        if (!isModalActive) {
          handleModal && handleModal()
        }
      }}
    >
      <div className={clsx(styles.ArchitectureItem_icon)}>
        <IconArrow />
      </div>
      <div className={clsx(styles.ArchitectureItem_title)}>{title}</div>
    </div>
  )
}
