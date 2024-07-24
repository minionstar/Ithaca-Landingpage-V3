import { Shader } from 'three'
import { perlin4d } from './perlin4d'

export const liquedPointsMaterial = ({ material }: any) => {

    material.roughness = .4
    material.metalness = .4
    material.transparent = true
    material.depthTest = true
    material.depthWrite = true

    const materialShader = { value: null as Shader | null }
    // @ts-expect-error
    material.onBeforeCompile = shader => {
        shader.uniforms.iTime = { value: 0 }
        shader.uniforms.iMouse = { value: { x: 0, y: 0 } }
        shader.uniforms.iVelocity = { value: 0 }
        shader.uniforms.resolution = { value: { x: window.innerWidth, y: window.innerHeight } }
        shader.uniforms.baseColor = { value: { r: .04, g: .25, b: .16 } }
        shader.uniforms.blobOut = { value: 0 }
        shader.uniforms.cropFaseZ = { value: 6.0 }
        shader.uniforms.uPixelRatio = { value: Math.min(window.devicePixelRatio, 2) },
        shader.uniforms.blobNextSection = { value: 0 }
        shader.uniforms.blobSectionFour = { value: 0 }


        shader.vertexShader = `
            uniform float iTime;
            uniform vec2 iMouse;
            varying float vPerlingStrength;
            varying vec3 vUv2;
            varying vec2 vUv;
            uniform float iVelocity;
            attribute float size;
            varying vec3 vPosition;
            uniform float blobOut;
            uniform float uPixelRatio;

            attribute float random1;
            attribute float random2;
            attribute float random3;

            ${perlin4d}

            float rand2(vec2 co) {
                return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
            }

            float backIn(float t) {
                const float s = 1.70158;
                return t * t * ((s + 1.0) * t - s);
            }

            vec4 getLiquedPosition() {
                vec3 pos = position;

                float uDisplacementFrequency = .6;
                float uDisplacementStrength = .3;

                float t = iTime;
                float perlingStrength = perlin4d(vec4(position * uDisplacementFrequency, t)) * uDisplacementStrength;
                pos += perlingStrength;

                return vec4(pos, perlingStrength);
            }

            vec3 getBlowPosition(float blobOut) {
                float angle = rand2(position.xz+.5);
                float radius = 10.0;
                float radians = angle * 6.28319; // 2 * PI
            
                float xOffset = cos(radians) * radius * random1;
                float yOffset = sin(radians) * radius * random2;
            
                vec3 blow = vec3(position.x + xOffset, position.y + yOffset, position.z);
                vec3 center = vec3(0.0, 0.0, -10.0);
            
                return mix(blow, center, blobOut);
            }

            \n
        `
        + shader.vertexShader.replace('void main() {', `
            void main() {
                vec4 liquedPos = getLiquedPosition();
                vec3 blowPosition = getBlowPosition(blobOut);
                vec3 newPosition = mix(liquedPos.xyz, blowPosition, blobOut);

                vUv = uv;
                vNormal = normal;
                vPerlingStrength = liquedPos.w;
                vPosition = newPosition;
        `)

        shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
            #include <fog_vertex>
            gl_PointSize = size * uPixelRatio * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        `)


        shader.fragmentShader = `
            varying float vPerlingStrength;
            varying vec2 vUv;
            uniform float iTime;
            uniform vec2 resolution;
            varying vec3 vPosition;

            uniform vec3 baseColor;
            uniform float blobOut;
            uniform float blobNextSection;
            uniform float blobSectionFour;

            uniform float cropFaseZ; //Used for mobile to make blob less bright on the front side


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

            float perling = vPerlingStrength;
            // perling += .1;
            // perling = clamp(.5, 1., perling);


            // Fade Points to Center
            float transparency = smoothstep(-15., 2., vPosition.z) * (1. - smoothstep(0., cropFaseZ, vPosition.z));
            // transparency *= step(-2., vPosition.z);

            // Add Another Transparency not on the first section
            float transparencySectionThree = (1. - smoothstep(0., 4., vPosition.z));
            float transparencySectionFour = smoothstep(-10., 1., vPosition.z) * (1. - smoothstep(0., 1., vPosition.z));
            
            transparency = mix(transparency, transparencySectionThree, blobNextSection);
            transparency = mix(transparency, transparencySectionFour, blobSectionFour);
            

            // Clamp Additive Flame Colors based on Z coordinate (Distance)
            float clampShiftZ = (smoothstep(-5., 2., vPosition.z) - smoothstep(0., 4., vPosition.z));
            float clampShiftSectionThree = (smoothstep(-6., 6., vPosition.z) - smoothstep(0., 4., vPosition.z));
            clampShiftZ = mix(clampShiftZ, clampShiftSectionThree, blobNextSection);

            clampShiftZ = mix(clampShiftZ, 0., blobSectionFour);


            float clampShiftY = min((smoothstep(-5., 2., vPosition.y) - smoothstep(0., 4., vPosition.y)) + .5, 2.5);

            // float shiftColor = (smoothstep(-2., 0., vPosition.z) - smoothstep(0., 8., vPosition.z)) * (perling + .9);

            // Change Color Based on Perling
            float shiftColor = smoothstep(-2., 5., perling * 20.);
            // float shiftColorScreenTwo = smoothstep(-10., 2., perling * 10.);
            // shiftColor = mix(shiftColor, shiftColorScreenTwo, blobNextSection);


            float shiftCovered = (perling + .1);

            // White Color
            vec3 whiteColor = baseColor + (shiftColor+shiftCovered);
            // Green Color
            vec3 greenColor = vec3(.0, .0+shiftColor*.8, 0.);

            vec3 additiveColor = (whiteColor+greenColor) * clampShiftZ * clampShiftY;

            // White Balls
            // vec3 whiteBallsColor = vec3(.15) * perling * 8.;
            // float clampBalls = (smoothstep(-3. - 1., -3. + 1., vPosition.z));
            // vec3 additiveWhiteBalls = whiteBallsColor * clampBalls;

            vec3 whiteBallsColor = vec3(.2, .4, .3) * max(0., perling * 5. + 1.5);
            float clampBalls = (smoothstep(-3. - 2., -3. + 0., vPosition.z));
            vec3 additiveWhiteBalls = whiteBallsColor * clampBalls/2.;
            additiveWhiteBalls = mix(vec3(0.), additiveWhiteBalls, blobNextSection);

            vec3 color = mix(baseColor + additiveColor + additiveWhiteBalls, baseColor, blobOut);
            float alpha = max(mix(transparency, -.1, blobOut), 0.);

            gl_FragColor = vec4(color, alpha);
        `)

        // console.log(shader.fragmentShader)

        materialShader.value = shader
    }
    const lastPointer = { x: 0, y: 0 }
    const render = (iTime: number/*, mouse: { x: number, y: number }*/) => {
        if (materialShader.value) {
            materialShader.value.uniforms[ 'iTime' ].value = iTime
            // materialShader.value.uniforms[ 'iMouse' ].value = mouse

            // lastPointer.x = THREE.MathUtils.lerp(lastPointer.x, mouse.x, .1)
            // lastPointer.y = THREE.MathUtils.lerp(lastPointer.y, mouse.y, .1)
            // const velocityX = mouse.x - lastPointer.x
            // const velocityY = mouse.y - lastPointer.y
            // materialShader.value.uniforms[ 'iVelocity' ].value = velocityX * velocityY
        }
    }

    return { instance: material, render, shader: materialShader }
}