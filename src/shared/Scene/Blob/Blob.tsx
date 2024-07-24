import {useFrame} from "@react-three/fiber"
import {useEffect, useMemo, useRef} from "react"

import {getProgress} from "../../../app/index"
import {getParams, useHeightScale} from "../adaptive"

import {usePointsMesh} from "./usePointsMesh"

export const Blob = () => {
  const ref = useRef<THREE.Mesh | null>(null)
  const points = usePointsMesh()
  const progress = getProgress()

  const {blobMoveY, blobMoveX, cropFaseZ} = useMemo(
    () => getParams(window.innerWidth),
    [],
  )
  useEffect(() => {
    points.shader.value?.uniforms?.cropFaseZ &&
      (points.shader.value.uniforms.cropFaseZ.value = cropFaseZ)
  }, [cropFaseZ])
  const heightScale = useHeightScale()

  useFrame(({clock}) => {
    const pr = progress.scrollData.get()
    points.render(clock.getElapsedTime())
    points.shader.value?.uniforms?.blobOut &&
      (points.shader.value.uniforms.blobOut.value = pr.blobOut)
    points.shader.value?.uniforms?.blobNextSection &&
      (points.shader.value.uniforms.blobNextSection.value = pr.blobNextSection)
    points.shader.value?.uniforms?.blobSectionFour &&
      (points.shader.value.uniforms.blobSectionFour.value = pr.blobSectionFour)

    if (ref.current) {
      const blMy = window.innerWidth <= 1024 ? pr.blobMobilePosY : 0 // To move Blob additionaly on mobile
      ref.current.position.y =
        blobMoveY * pr.blobPosY * heightScale + blobMoveY * heightScale * blMy
      ref.current.position.x = blobMoveX * pr.blobPosX * heightScale

      if (ref.current.visible && pr.blobOut >= 0.9) {
        ref.current.visible = false
      }
      if (!ref.current.visible && pr.blobOut < 0.9) {
        ref.current.visible = true
      }
    }
  })

  return (
    <primitive
      scale={[heightScale, heightScale, heightScale]}
      ref={ref}
      object={points.mesh}
    />
  )
}
