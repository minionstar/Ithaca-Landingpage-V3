import * as THREE from 'three'
import { goldNoise } from './goldNoise'

export const PointMaterial = () => {
    const uniforms = { 
        uTime: { value: 0 },
        uPositionZ: { value: 3 },
        uPositionY: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }

    const vertexShader = `
        attribute vec3 color;
        attribute float size;
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vPosition;

        uniform float uPositionZ;
        uniform float uPositionY;
        uniform float uPixelRatio;
        uniform float uTime;

        void main() {
            vColor = color;
            vUv = uv;

            vec3 newPos = position;
            vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            gl_PointSize = size * uPixelRatio * 5.;
            vPosition = newPos;
        }
    `

    const fragmentShader = `
        varying vec3 vColor;
        varying vec2 vUv;
        uniform float uTime;
        varying vec3 vPosition;

        ${goldNoise}

        void main() {
            float dist = length(gl_PointCoord - vec2(0.5, 0.5));
            float alpha = pow(1. - smoothstep(.00001, .3, dist), 3.);
            float fakeBloom = .05 * (1. - smoothstep(.3, .4, dist));
            float blink = (sin(uTime / 4. * goldNoise(vec2(vPosition.x, vPosition.x), 1.) * 5.) + 1.25) / 2.;

            gl_FragColor = vec4(vec3(.8, .8, .8)*2., (alpha + fakeBloom) * blink);
        }
    `

    return new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        depthWrite: false,
        toneMapped: false,
        transparent: true,
    })
}