import * as THREE from 'three'
import { Shader } from 'three'
import { normalizeColor } from './normalizeColor'

export const universeMaterial = ({ material }: any) => {

    material.roughness = .4
    material.metalness = .4
    material.transparent = true
    material.depthTest = false

    const materialShader = { value: null as Shader | null }
    // @ts-expect-error
    material.onBeforeCompile = shader => {
        shader.uniforms.iTime = { value: 0 }
        shader.uniforms.resolution = { value: { x: window.innerWidth, y: window.innerHeight } }
        shader.uniforms.baseColor = { value: { r: .0, g: .5, b: .2 } }
        shader.uniforms.universeIn = { value: 0 }
        shader.uniforms.universeOut = { value: 0 }
        shader.uniforms.uPixelRatio = { value: Math.min(window.devicePixelRatio, 2) },

        shader.vertexShader = `
            uniform float iTime;
            uniform float universeIn;
            uniform float uPixelRatio;

            varying vec2 vUv;
            varying vec3 vPosition;

            attribute float size;
            attribute float used;
            attribute vec3 color;

            varying float vUsed;
            varying vec3 vColor;
            \n
        `
        + shader.vertexShader.replace('void main() {', `
            void main() {
                vec3 newPosition = position;
                vUv = uv;
                vNormal = normal;
                vPosition = newPosition;
                vUsed = used;
                vColor = color;
        `)

        shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
            #include <fog_vertex>
            gl_PointSize = size * uPixelRatio * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        `)


        shader.fragmentShader = `
            uniform float iTime;
            uniform vec3 baseColor;
            uniform float universeIn;
            uniform float universeOut;
            varying vec2 vUv;
            varying vec3 vPosition;
            varying float vUsed;
            varying vec3 vColor;

            ${normalizeColor}

            \n
        `
        + shader.fragmentShader.replace('void main() {', `
            void main() {
        `)

        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
            #include <dithering_fragment>

            // Make Points Rounded
            vec2 pointUV = gl_PointCoord * 2.0 - 1.0;
            float distance = length(pointUV);
            float threshold = 0.8;
            if (distance >= threshold) {
                discard;
            }

            float inAlpha = clamp((universeIn - .5) * 4., 0., 1.);
            float outAlpha = clamp((1. - (universeOut - .5)*2.5), 0., 1.);

            vec3 color = normalizeColor(vColor);
            gl_FragColor = vec4(color, vUsed * inAlpha * outAlpha);
        `)

        materialShader.value = shader
    }
    const render = (iTime: number) => {
        if (materialShader.value) {
            materialShader.value.uniforms[ 'iTime' ].value = iTime
        }
    }

    return { instance: material, render, shader: materialShader }
}