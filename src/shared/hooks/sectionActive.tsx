import {useState} from "react"

export interface ISectionActive {
  isActive: boolean
  active: () => void
  disable: () => void
}

export const sectionActive = () => {
  const [isActive, setActive] = useState<boolean>(false)
  const [isFirstActive, setFirstActive] = useState<boolean>(false)

  const firstActive = () => {
    setFirstActive(true)
  }

  const active = () => {
    setActive(true)
  }

  const disable = () => {
    setActive(false)
  }

  return {
    isActive,
    isFirstActive,
    active,
    disable,
    firstActive,
  }
}
