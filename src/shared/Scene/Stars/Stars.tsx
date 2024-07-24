import { useMemo, useRef } from "react"
import { Points, Point } from "@react-three/drei"
import { MathUtils } from "three"
import { PointMaterial } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import * as THREE from 'three'

import { PointMaterial as getPointMaterial } from "./PointMaterial"
import { getParams, useHeightScale } from "../adaptive"

const Stars = () => {
    const ref = useRef<THREE.Points | null>(null)
    const localStarsRef = useRef<THREE.Points | null>(null)
    const material = useMemo(() => getPointMaterial(), [])
    const { starsCloseDensity, starsFarDensity, starsFlowSpeed, starsEnbaleMouseReaction } = useMemo(() => getParams(window.innerWidth), [])

    useFrame(({ clock, pointer }) => {
        // @ts-expect-error
        ref.current.rotation.z += 0.0001
        material.uniforms.uTime.value = clock.getElapsedTime()

        if (!localStarsRef.current) { return }
        if (!starsEnbaleMouseReaction) { return }
        const y = pointer.y * .2
        const x = pointer.x * .2

        localStarsRef.current.position.y = THREE.MathUtils.lerp(localStarsRef.current.position.y, y, .075)
        localStarsRef.current.position.x = THREE.MathUtils.lerp(localStarsRef.current.position.x, x, .075)
    })

    useFrame(({ camera }) => {
        const r = localStarsRef.current
        if (!r) { return }
        const position = r.geometry.attributes.position.array
        for (let i = 0; i < position.length; i += 3) {
            position[i + 2] += starsFlowSpeed
            if (position[i + 2] > camera.position.z) {
                position[i + 2] = 0
            }
        }
    })

    const starsClosePositions = useMemo(() => new Float32Array(Array.from({ length: starsCloseDensity * 3 }, (j,i: number) => MathUtils.randFloat(-10, 10))), [starsCloseDensity])
    const starsCloseSizes = useMemo(() => new Float32Array(Array.from({ length: starsCloseDensity }, () => MathUtils.randFloat(.1, 2))), [starsCloseDensity])
    const starsFarPositions = useMemo(() => Array.from({ length: starsFarDensity }, (i) => [
        MathUtils.randFloatSpread(30),
        MathUtils.randFloatSpread(30),
        MathUtils.randFloat(2, 8),
    ]), [starsFarDensity])

  const heightScale = 1

    return (
        <group scale={[heightScale, heightScale, heightScale]}>
        {/* Far Stars */}
            <Points
                ref={ref}
                limit={starsFarDensity}
                range={starsFarDensity}
            >
                <PointMaterial transparent vertexColors size={1} sizeAttenuation={false} depthWrite={false} toneMapped={false} />
                { starsFarPositions.map((position, i) => 
                    <Point
                        key={i}
                        // @ts-expect-error
                        position={position}
                        color="white" 
                    />) 
                }
            </Points>
            {/* Close Stars */}
            <Points
                name="close-stars"
                ref={localStarsRef}
                positions={starsClosePositions} 
                sizes={starsCloseSizes}
                material={material}
            />
        </group>

    )
}

export default Stars