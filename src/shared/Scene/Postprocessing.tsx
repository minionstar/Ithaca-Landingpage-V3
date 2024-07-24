import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

const Postprocessing = () => {
    return (
        <> 
            <EffectComposer 
                renderPriority={2}
            >
                {/* Use This Bloom As Selective, controlling by lifting material out of range [0,1]  */}
                <Bloom 
                    intensity={3.5}
                    kernelSize={KernelSize.VERY_LARGE} 
                    luminanceThreshold={0.2} 
                    luminanceSmoothing={0.001} 
                    mipmapBlur={false}
                />
                {/* <Noise
                    premultiply={true} // enables or disables noise premultiplication
                    blendFunction={BlendFunction.ADD} // blend mode
                /> */}
            </EffectComposer>
        </>
        
    )
}

export default Postprocessing