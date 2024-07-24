import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useEffect, useMemo, useRef} from "react"
import * as THREE from "three"
import {lerp} from "three/src/math/MathUtils.js"

import {getProgress} from "../../app"

import {getParams, useHeightScale} from "./adaptive"

const rotation = new THREE.Vector3()
export const Model = () => {
  const {scene} = useGLTF("logo_Ithaca/3D_logo_Ithaca.gltf")
  const ref = useRef<THREE.Mesh | null>(null)

  const progress = getProgress()
  const shader = useRef<THREE.Shader | null>(null)

  const {logoScale, logoEnableMouseReaction, blobMoveX, blobMoveY} = useMemo(
    () => getParams(window.innerWidth),
    [],
  )
  const heightScale = useHeightScale()

  useFrame(({pointer}) => {
    if (!ref.current) {
      return
    }
    const pr = progress.scrollData.get()
    const logoOut = 1 - pr.logoOut
    const logoAlphaOut = 1 - pr.logoAlphaOut
    logoEnableMouseReaction &&
      rotation.set(
        lerp(rotation.x, pointer.y / -1.5, 0.1),
        lerp(rotation.y, pointer.x / 1.5, 0.1),
        0,
      )
    const rotPr = Math.min(pr.logoAlphaOut * 6, 1)
    ref.current.rotation.x = lerp(rotation.x, 0, rotPr)
    ref.current.rotation.y = lerp(rotation.y, 0, rotPr)
    ref.current.rotation.z = lerp(rotation.z, 0, rotPr)

    ref.current.position.z = (logoOut - 1) * heightScale
    const sc = 1 + (logoOut - 1)
    ref.current.scale.set(sc, sc, sc)
    if (shader.current) {
      shader.current.uniforms.logoOut.value = Math.pow(logoAlphaOut, 5)
      if (
        ref.current.visible &&
        shader.current.uniforms.logoOut.value <= 0.001
      ) {
        ref.current.visible = false
      }
      if (
        !ref.current.visible &&
        shader.current.uniforms.logoOut.value > 0.001
      ) {
        ref.current.visible = true
      }
    }
    const blMy = window.innerWidth <= 1024 ? pr.blobMobilePosY : 0 // To move Blob additionaly on mobile
    ref.current.position.y =
      blobMoveY * pr.blobPosY * heightScale + blobMoveY * heightScale * blMy
    ref.current.position.x = blobMoveX * pr.blobPosX * heightScale
  })

  useEffect(() => {
    scene.renderOrder = 999
    scene.traverse((_: any) => {
      if (_?.material) {
        _.material.transparent = true
        _.material.depthTest = false
        _.material.depthWrite = false
        _.material.roughness = 0.6
        _.material.metalness = 0.8
        // console.log(_.material)
        _.material.onBeforeCompile = (_shader: THREE.Shader) => {
          _shader.uniforms.logoOut = {value: 1}
          _shader.fragmentShader =
            `uniform float logoOut;\n` + _shader.fragmentShader
          _shader.fragmentShader = _shader.fragmentShader.replace(
            "#include <dithering_fragment>",
            `
                        #include <dithering_fragment>\n
                        // gl_FragColor.rgb += .05;
                        // gl_FragColor.rgb *= 3.;
                        // gl_FragColor.r = min(gl_FragColor.r, .25);
                        // gl_FragColor.g = min(gl_FragColor.g, .25);
                        // gl_FragColor.b = min(gl_FragColor.b, .25);

                        gl_FragColor.a *= logoOut;
                    `,
          )
          shader.current = _shader
        }
      }
    })
  }, [scene])

  return (
    <group ref={ref as any}>
      <primitive
        scale={[
          logoScale * heightScale,
          logoScale * heightScale,
          logoScale * heightScale,
        ]}
        position={[0, 0, 0]}
        object={scene}
      />
    </group>
  )
}

useGLTF.preload("logo.glb")
