
import { useEffect, useMemo, useState } from 'react'
import { Hud, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { Blob } from './Blob/Blob'
import Postprocessing from './Postprocessing'
import { Model } from './Model'
import { getParams } from './adaptive'
import { Three } from '../../layout/CanvasLayout/components/Three'
import { Universe } from './Universe/Universe'
import { Lights } from './Lights'
import { AdaptiveDpr } from '@react-three/drei'
import { Stats } from '@react-three/drei'
import Stars from './Stars/Stars'
import Grid from './Grid/Grid'
// import BloomHud from './BloomHud'

const Scene = () => {
    const cameraZ = useMemo(() => getParams(window.innerWidth).cameraZ, [])

    return (
        <>
            <Three>
                {/* <BloomHud renderPriority={2}> */}
                    <OrthographicCamera makeDefault position={[0, 0, 1000]} />
                    <Blob />
                    <Universe />
                    <Grid/>
                    <Postprocessing />
                    {/* <OrbitControls/> */}
                {/* </BloomHud> */}
                <Hud renderPriority={2}>
                    <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} />
                    <Stars />
                </Hud>
                <Hud renderPriority={3}>
                    <OrthographicCamera makeDefault position={[0, 0, 1000]} />
                    <Model />
                    <Lights />
                </Hud>
                <AdaptiveDpr/>
                {/* <Stats/> */}
            </Three>
        </>
    )
}

// For the next.js only
export const ClientOnly = ({children}: any) => {
    const [mounted, mount] = useState(false)
    useEffect(() => void mount(true), [])
    if (!mounted) { return null }
    return <>{children}</>
}

export { Scene }
