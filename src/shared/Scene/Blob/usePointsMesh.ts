import { useMemo } from "react"
import { liquedPointsMaterial } from "./liquedPointsMaterial"
import * as THREE from 'three'
import { randFloatSpread } from "three/src/math/MathUtils.js"
import { getParams } from "../adaptive"

export const usePointsMesh = () => {
    return useMemo(() => {
        const material = liquedPointsMaterial({ material: new THREE.MeshPhysicalMaterial() })
        const geometry = new THREE.BufferGeometry()

        // Set Adaptive only on Mount
        const params = getParams(window.innerWidth)

        const positions = []
        const sizes = []
        const random1 = []
        const random2 = []
        const random3 = []
        const density = params.blobPointDensity; // Change this to set the number of lines
        const pointsPerLine = params.blobPointDensity; // Change this to set the number of points per line
        const radius = params.blobRadius; // Change this to your desired radius
        const size = params.blobPointSize 
        
        for (let i = 0; i < density; i++) {
        const theta = (2 * Math.PI / density ) * i ; // longitude angle

          for (let j = 0; j < pointsPerLine; j++) {
            const phi = (Math.PI / (pointsPerLine - 1) ) * j; // latitude angle
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            const rotatedY = y * Math.cos(Math.PI / 2) - z * Math.sin(Math.PI / 2);
            const rotatedZ = y * Math.sin(Math.PI / 2) + z * Math.cos(Math.PI / 2);
        
            positions.push(x, rotatedY, rotatedZ);
            sizes.push(size)
            random1.push(randFloatSpread(2))
            random2.push(randFloatSpread(2))
            random3.push(randFloatSpread(2))
          }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
        
        geometry.setAttribute('random1', new THREE.Float32BufferAttribute(random1, 1))
        geometry.setAttribute('random2', new THREE.Float32BufferAttribute(random2, 1))
        geometry.setAttribute('random3', new THREE.Float32BufferAttribute(random3, 1))


        const points = new THREE.Points(
            geometry,
            material.instance
        )

        return { mesh: points, render: material.render, shader: material.shader }

    }, [])
}