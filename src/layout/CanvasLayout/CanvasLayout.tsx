import {Preload} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import {Leva, useControls} from "leva"
import {useRef} from "react"
import * as THREE from "three"

import {r3f} from "./components/Three"

// Everything defined in here will persist between route changes, only children are swapped
const CanvasLayout = ({children}: any) => {
  const ref = useRef()
  const data = useControls("GL", {
    exposure: {value: 5, min: -5, max: 5},
    toneMapping: {
      options: {
        filmic: THREE.ACESFilmicToneMapping,
        linear: THREE.LinearToneMapping,
        notone: THREE.NoToneMapping,
        reinhard: THREE.ReinhardToneMapping,
        cineon: THREE.CineonToneMapping,
      },
    },
    encoding: {
      options: {
        linear: THREE.LinearSRGBColorSpace,
        rgb: THREE.SRGBColorSpace,
      },
    },
    background: {value: "#060913"},
    enableBg: {value: false},
    hideCanvas: {value: false},
  })

  return (
    <div
      // @ts-expect-error
      ref={ref}
      style={{
        position: "relative",
        width: " 100%",
        height: "100%",
        minHeight: "100vh",
        zIndex: 1,
      }}
    >
      {children}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          visibility: data.hideCanvas ? "hidden" : "visible",
        }}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: true,
          toneMappingExposure: Math.pow(2, data.exposure),
          toneMapping: data.toneMapping,
          outputColorSpace: data.encoding,
        }}
        // @ts-expect-error
        eventSource={ref}
        eventPrefix="client"
      >
        {data.enableBg && (
          <color attach={"background"} args={[data.background]} />
        )}
        {/* @ts-ignore */}
        <r3f.Out />
        <Preload all />
      </Canvas>
      <Leva hidden={true} />
    </div>
  )
}

export {CanvasLayout}
