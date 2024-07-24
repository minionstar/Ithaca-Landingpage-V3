import { useMemo } from "react"
import { universeMaterial } from "./universeMaterial"
import * as THREE from 'three'
import { getParams } from "../adaptive"
import { randFloat } from "three/src/math/MathUtils.js"
import { getProgress } from "../../../app/index"

function getUniversePoints({material}: {material: any}) {
    const geometry = new THREE.BufferGeometry()
    const params = getParams(window.innerWidth)

    const renderCoef = 3 // Change this instead renderDelta to save effect
    const renderDelta = 0.01 * renderCoef
    const maxPointsPerRenderFrame = params.universeMaxPointsPerRenderFrame

    const density = params.universeDensity // [CH]: Amount of points per object
    const velocity = 0.006 * renderCoef // [CH]: Default Velocity
    const velocityDecrease = 0.00001 * renderCoef
    const velocityMin = 0.002
    const initialRadius = params.universeInitialRadius // [CH]: Default Radius
    const tubeRadius = .08
    const tubeMaxRadiusScale = 30
    const minPointSize = params.universeMinPointSize
    const maxPointSize = params.universeMaxPointSize
    const ellipseIntensity = .8
    const pointColors = [
        // { r:0 ,g:196*1.5 ,b:120*2 }, // green
        // { r:100*1 ,g:100 ,b:255*3 }, // purple
        // { r:204*.8 ,g:221*.8,b:255*.8 }, // white
        { r:95 ,g:133 ,b:124 }, // green
        { r:92 ,g:59 ,b:138 }, // purple
        { r:98 ,g:113,b:139 }, // white
    ]
    function getRandColor() {
        const t = Math.random()
        if (t < .6) {
            return pointColors[0]
        }
        if (t < .8) {
            return pointColors[1]
        }
        return pointColors[2]
    }
    const opacityDecrease = 0.0015 * renderCoef
    const opacityIncrease = 0.01

    const sizes = []
    const positions: number[] = [];
    const saved_g_positions: number[] = [];

    const speeds: number[] = [];
    const used: number[] = [];
    const random: number[] = []

    const angles: number[] = [];
    const radiuses: number[] = [];
    const velocities: number[] = [];

    const appear: boolean[] = [];
    const colors: number[] = [];

    const renderEnabled = { value: false }


    for (let i = 0; i < density; i++) {
        // Generate Root Sphere
        const {x, y, z} = getRandomPointInSphere(1)
        positions.push(x, y, z)
        saved_g_positions.push(x, y, z)
        // 

        const min = 0.1
        sizes.push(randFloat(minPointSize, maxPointSize))
        speeds.push(Math.pow(Math.random() * (1. - min) + min, .9))
        used.push(0)
        angles.push(0)
        radiuses.push(0)
        velocities.push(velocity)
        appear.push(false)
        random.push(Math.random()+0.1, Math.random()+0.1, Math.random()+0.1)

        const col = getRandColor()
        colors.push(col.r, col.g, col.b)
    }
    function getRandomPointInSphere(radius: number) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u; // azimuthal angle
        const phi = Math.acos(2 * v - 1); // polar angle
    
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
    
        let t = Math.random()
        let k = Math.random()
        t = k < .3 ? t * tubeMaxRadiusScale : t //Add outer Random Points
        const pointRadius = Math.cbrt(Math.pow(t * tubeRadius, 1)) * radius;
        return { x: x*pointRadius, y: y*pointRadius, z: z*pointRadius };
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('used', new THREE.Float32BufferAttribute(used, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const points = new THREE.Points(
        geometry,
        material.instance
    )
    points.visible = false

    const angle = { value: 0 }
    const render = (delta: number) => {
        if (!renderEnabled.value) { return }

        const g_positions = points.geometry.attributes.position.array;
        const used = points.geometry.attributes.used.array

        // Blow animation
        const universeOut = getProgress().scrollData.get().universeOut
        if (universeOut > 0.5) {
            for (let i = 0; i < positions.length; i += 3) {
                const p = (universeOut - 0.5) * 2
                g_positions[i] = (saved_g_positions[i]+saved_g_positions[i]*random[i] *10* p) 
                g_positions[i+1] = (saved_g_positions[i+1]+saved_g_positions[i+1]*random[i+1] *10* p) 
                g_positions[i + 2] = (saved_g_positions[i+2]+saved_g_positions[i+2]*random[i+2] *10* p) 
            }
            points.geometry.attributes.position.needsUpdate = true;
            return
        }
        
        material.render(delta)

        const r = new THREE.Vector3(initialRadius, 0, 0);
        const max = maxPointsPerRenderFrame
        let current = 0

        // Use this instead of time to fix render holes
        angle.value += renderDelta // [CH]: Render Speed

        for (let i = 0; i < positions.length; i += 3) {


            const rx = positions[i];
            const rz = positions[i + 2];
            const initialPoint = new THREE.Vector3(rx, 0, rz);
            const fromCenter = initialPoint.clone().sub(r);
            const radius = fromCenter.length();

            // Draw on Circle
            if (used[i/3]===0 && current < max) {
                const newX = Math.cos(angle.value) * radius * ellipseIntensity;
                const newZ = Math.sin(angle.value) * radius;
        
                saved_g_positions[i] = g_positions[i] = newX;
                saved_g_positions[i + 1] = g_positions[i + 1] = positions[i + 1];
                saved_g_positions[i + 2] = g_positions[i + 2] = newZ;

                current++
                used[i/3] = 0.0001 // FadeIn it then
                angles[i/3] = angle.value
                radiuses[i/3] = radius
                appear[i/3] = true
                velocities[i/3] = velocity
            }
            // FadeIn
            if (appear[i/3]) {
                used[i/3] = Math.min(used[i/3]+opacityIncrease, 1) // [CH]: Fade IN
                if (used[i/3] === 1) { appear[i/3] = false }
            }
            // Scale
            if (used[i/3] > 0) {
                radiuses[i/3] += velocities[i/3]
                angles[i/3] += random[i/3]/1000
                velocities[i/3] = Math.max(velocities[i/3]-velocityDecrease, velocityMin) // [CH]: Become Slowlier After Spawn
                saved_g_positions[i] = g_positions[i] = Math.cos(angles[i/3]) * radiuses[i/3] * ellipseIntensity;
                saved_g_positions[i + 1] = g_positions[i + 1] = positions[i + 1];
                saved_g_positions[i + 2] = g_positions[i + 2] = Math.sin(angles[i/3]) * radiuses[i/3];

                // Go back to 0 opacity
                if (!appear[i/3]) {
                    used[i/3] = Math.max(used[i/3] - opacityDecrease, 0)
                }
            }
        }

        points.geometry.attributes.position.needsUpdate = true;
        points.geometry.attributes.used.needsUpdate = true;
    }

    const resetAngle = () => {
        angle.value = 0
        const g_positions = points.geometry.attributes.position.array
        const used = points.geometry.attributes.used.array
        for (let i = 0; i < positions.length; i += 3) {
            used[i/3] = 0
            appear[i/3] = false
            g_positions[i] = positions[i]
            g_positions[i+1] = positions[i+1]
            g_positions[i+2] = positions[i+2]
        }
        points.geometry.attributes.position.needsUpdate = true;
        points.geometry.attributes.used.needsUpdate = true;
    }

    const startRender = () => {
        renderEnabled.value = true
        points.visible = true
    }

    const stopRender = () => {
        resetAngle()
        renderEnabled.value = false
        points.visible = false
    }

    return { points, render, shader: material.shader, startRender, stopRender }
}

export const useUniverseMesh = () => {
    return useMemo(() => {

        const uniMaterial = universeMaterial({ material: new THREE.MeshPhysicalMaterial() })
        uniMaterial.instance.toneMapped = false
        // uniMaterial.instance.emissiveIntensity = 2
        const points1 = getUniversePoints({ material: uniMaterial })
        const points2 = getUniversePoints({ material: uniMaterial })

        const group = new THREE.Group()
        group.add(points1.points)
        group.add(points2.points)
        points2.points.rotation.y = Math.PI // Flip second one
        group.rotation.set(1, -1, .5)



        const render = (time: number) => {
            points1.render(time)
            points2.render(time)
        }

        const startRender = () => {
            points1.startRender()
            points2.startRender()
        }

        const stopRender = () => {
            points1.stopRender()
            points2.stopRender()
        }

        const shader = uniMaterial.shader

        return { mesh: group, render, shader, startRender, stopRender }

    }, [])
}