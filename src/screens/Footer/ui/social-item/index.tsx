import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface ISocialItem {
  title: string
  href: string
  Icon?: FC
  disabled?: boolean
  isSmall?: boolean
}

export const SocialItem: FC<ISocialItem> = ({
  Icon,
  href,
  title,
  isSmall,
  disabled,
}) => {
  return (
    <a
      className={clsx(
        styles.SocialItem,
        {[styles.small]: isSmall},
        disabled && styles.disabled,
      )}
      href={href === "#" ? undefined : href}
      target="_blank"
    >
      {Icon && (
        <div className={clsx(styles.SocialItem_icon)}>
          <Icon />
        </div>
      )}
      <div className={clsx(styles.SocialItem_info)}>
        <div className={clsx(styles.SocialItem_info_title)}>{title}</div>
      </div>
    </a>
  )
}
