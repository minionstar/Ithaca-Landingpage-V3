import {FC, RefObject, useEffect, useRef} from "react"

interface IFlyingParticles {
  element: RefObject<HTMLButtonElement> | null
}

type TypeFakes = {x: number; y: number; speed: number}

export const FlyingParticles: FC<IFlyingParticles> = ({element}) => {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (element && element.current && refCanvas.current) {
      const canvas = refCanvas.current
      const h = element ? element.current.clientHeight : 100
      const w = element ? element.current.clientWidth : 100
      canvas.height = h
      canvas.width = w
    }
  }, [element])

  useEffect(() => {
    if (element && element.current && refCanvas.current) {
      const canvas = refCanvas.current
      const h = element ? element.current.clientHeight : 100
      const w = element ? element.current.clientWidth : 100
      canvas.height = h
      canvas.width = w
      const context = canvas.getContext("2d")

      if (context) {
        const flakes: TypeFakes[] = []
        const addFlakes = () => {
          const x = Math.ceil(Math.random() * w)
          const speed = Math.ceil(Math.random() * 2)
          const radius = 2 * Math.PI

          flakes.push({
            x: x,
            y: canvas.height,
            speed: speed,
          })
        }

        const snowFall = () => {
          context.clearRect(0, 0, canvas.width, canvas.height)
          addSnow()
        }

        const addSnow = () => {
          for (let i = 0; i < flakes.length; i++) {
            let oneFlake: TypeFakes = flakes[i]

            context.beginPath()
            context.fillStyle = "#00e778"
            context.arc(
              oneFlake.x,
              (oneFlake.y -= oneFlake.speed / 4),
              oneFlake.speed * 0.3,
              0,
              Math.PI * 2,
            )
            context.fill()
            context.closePath()

            if (oneFlake.y > canvas.height) {
              oneFlake.y = 0
            }
          }
        }

        const animate = () => {
          snowFall()
          requestAnimationFrame(animate)
        }

        animate()
        setInterval(() => addFlakes(), 20)
      }
    }
  }, [])
  return <canvas ref={refCanvas} />
}
