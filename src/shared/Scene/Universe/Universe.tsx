import { useFrame } from "@react-three/fiber"
import { useUniverseMesh } from "./useUniverseMesh"

import { getProgress } from "../../../app/index"
import { useRef } from "react"
import { useHeightScale } from "../adaptive"

export const Universe = () => {
    const points = useUniverseMesh()
    const progress = getProgress()
    const playing = useRef(false)

    useFrame(({ clock }) => {
        points.render(clock.getElapsedTime())
        const pr = progress.scrollData.get()
        points.shader.value?.uniforms.universeIn && (points.shader.value.uniforms.universeIn.value = pr.universeIn)
        points.shader.value?.uniforms.universeOut && (points.shader.value.uniforms.universeOut.value = pr.universeOut)
        
        if (!playing.current && pr.universeIn >= .5) { playing.current = true; points.startRender() }
        if (playing.current && pr.universeIn < .5) { playing.current = false; points.stopRender() }

        const sc = .3 + pr.universeScale
        points.mesh.scale.set(sc, sc, sc)
    })

  const heightScale = useHeightScale()

    return (
        <group scale={[heightScale, heightScale, heightScale]}>
            <primitive object={points.mesh} />
        </group>
    )
}