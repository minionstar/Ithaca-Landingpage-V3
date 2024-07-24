import clsx from "clsx"
import {FC, useEffect, useRef} from "react"

import styles from "./index.module.scss"

interface ICanvasStars {}

export const CanvasStars: FC<ICanvasStars> = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refCanvasBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refCanvas.current) {
      const canvas = refCanvas.current

      const c = canvas.getContext("2d")

      let w: number
      let h: number

      const setCanvasExtents = () => {
        if (refCanvasBox.current) {
          w = refCanvasBox.current.clientWidth
          h = refCanvasBox.current.clientHeight
          canvas.width = w
          canvas.height = h
        }
      }

      setCanvasExtents()

      const makeStars = (count: number) => {
        const out = []
        for (let i = 0; i < count; i++) {
          const s = {
            x: Math.random() * 1600 - 800,
            y: Math.random() * 900 - 450,
            z: Math.random() * 1000,
          }
          out.push(s)
        }
        return out
      }

      let stars = makeStars(500)

      window.onresize = () => {
        setCanvasExtents()
      }

      const clear = () => {
        if (c) {
          c.fillStyle = "black"
          c.fillRect(0, 0, canvas.width, canvas.height)
        }
      }

      const putPixel = (x: number, y: number, brightness: number) => {
        if (c) {
          const intensity = brightness * 255
          const rgb =
            "rgb(" + intensity + "," + intensity + "," + intensity + ")"
          c.fillStyle = rgb
          c.fillRect(x, y, 1.8, 1.8)
        }
      }

      const moveStars = (distance: number) => {
        const count = stars.length
        for (let i = 0; i < count; i++) {
          const s = stars[i]
          s.z -= distance
          if (s.z <= 1) {
            s.z += 999
          }
        }
      }

      const paintStars = () => {
        const cx = canvas.width / 2
        const cy = canvas.height / 2

        const count = stars.length
        for (let i = 0; i < count; i++) {
          const star = stars[i]

          const x = cx + star.x / (star.z * 0.001)
          const y = cy + star.y / (star.z * 0.001)

          if (x < 0 || x >= w || y < 0 || y >= h) {
            continue
          }

          const d = star.z / 1000.0
          const b = 1 - d * d

          putPixel(x, y, b)
        }
      }

      let prevTime: number
      const init = (time: number) => {
        prevTime = time
        requestAnimationFrame(tick)
      }

      const tick = (time: number) => {
        let elapsed = time - prevTime
        prevTime = time

        moveStars(elapsed * 0.02)

        clear()
        paintStars()

        requestAnimationFrame(tick)
      }

      requestAnimationFrame(init)
    }
  }, [])

  return (
    <div className={clsx(styles.CanvasStars)} ref={refCanvasBox}>
      <canvas ref={refCanvas} />
    </div>
  )
}
