import {shallow} from "zustand/shallow"
import {createWithEqualityFn} from "zustand/traditional"

export interface UseScroll {
  isEnableScroll: boolean
  start: () => void
  stop: () => void
}
export const useScroll = createWithEqualityFn<UseScroll>(
  (set, get) => ({
    isEnableScroll: false,
    start: () => set({isEnableScroll: true}),
    stop: () => set({isEnableScroll: false}),
  }),
  shallow,
)
