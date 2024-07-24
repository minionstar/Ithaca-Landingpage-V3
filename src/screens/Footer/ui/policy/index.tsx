import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"
import {PolicyItem} from "./ui/policy-item"

interface IPolicy {}

const dataPolicy = [
  {
    title: "Privacy Policy",
    href: "https://app.ithacaprotocol.io/privacy",
  },
  {
    title: "Terms & Conditions",
    href: "https://app.ithacaprotocol.io/terms",
  },
]

export const Policy: FC<IPolicy> = () => {
  return (
    <div className={clsx(styles.Policy)}>
      {dataPolicy.map((e, i) => (
        <PolicyItem {...e} key={i} />
      ))}
    </div>
  )
}
