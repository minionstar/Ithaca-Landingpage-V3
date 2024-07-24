
import { ShaderMaterial} from 'three';
import useGridMesh from './UseGridMesh';
import usePulseMesh from './UsePulseMesh/UsePulseMesh';
import { useFrame } from '@react-three/fiber';
import { getProgress } from '../../../app';
import {useSpring, useMotionValue} from 'framer-motion'
import { useEffect } from 'react';
import { useHeightScale } from '../adaptive';

const states: any = {}

function SquareWrapper({ mesh, onPointerMove, pulseMesh, idf}: { mesh: any, onPointerMove: any, pulseMesh: any, idf: any}) {
  const material = mesh.material as ShaderMaterial;
  const pulseMaterial = pulseMesh.material as ShaderMaterial;
  const value = useMotionValue(0);

  states[idf] = false


  const spring = useSpring(value, { stiffness: 500, damping: 70});

  useEffect(() => {
    const onChange = (latest: number) => {
      if (material) {
        material.uniforms.isHovered.value = latest;
        material.needsUpdate = true;
      }
    };

    const changeValue = spring.onChange(onChange);

    return () => {
      changeValue();
    };
  }, [spring, material]);

  const timer = (startTime: any) => {
    let start = startTime;
  
    const update = () => {
      const elapsed = Date.now() - start;
      const elapsedSeconds = elapsed / 1000;
  
      const clampedValue = Math.min(Math.max(elapsedSeconds, 0), 3);
      

      pulseMaterial.uniforms.isHovered.value = clampedValue;
  
      if (elapsedSeconds < 3) {
        requestAnimationFrame(update);
      } else {
        states[idf] = false
      }
    }
    
    update()
  };

  const onHover = () => {
    const startTime: any = Date.now();
    if(!states[idf]){
      timer(startTime);
    }
    spring.set(1.0);
    states[idf] = true
  };

  const onLeave = () => {
    spring.set(0.0);
  };


  return (
    <>
      <primitive
        object={mesh}
        onPointerEnter={() => onHover()}
        onPointerMove={onPointerMove}
        onPointerLeave={() => onLeave()}
      />
      <primitive
        object={pulseMesh}
      />
    </>
  );
}

export default function Grid() {

  const { meshes, gridOut, mouseX, mouseY, griduTime} = useGridMesh()
  const {pulseMeshes, uTime, pulseOut} = usePulseMesh()

  const progress = getProgress()

  useFrame(({ clock }) => {
      uTime.value = clock.getElapsedTime();
      griduTime.value = clock.getElapsedTime()
      gridOut.value = progress.scrollData.get().gridOut;
      pulseOut.value = progress.scrollData.get().gridOut
  });

  const heightScale = useHeightScale()


  return (
    <group scale={[heightScale, heightScale, heightScale]} position={[0, 0, -400]}>
      <group>
        {meshes.map((arr: any, index: number) => (
          <SquareWrapper 
            onPointerMove={(e: any) => {
              mouseX.value = (e.point.x / window.innerWidth) * 2 * (Math.abs(e.intersections[0].object.userData.position.x) + 1.25)
              mouseY.value = (e.point.y / window.innerHeight) * 2 * (Math.abs(e.intersections[0].object.userData.position.y) + 1.25)
            }}
            key={index}
            idf={index}
            mesh={arr[0]}
            pulseMesh={arr[1]}
          />
        ))}

        {pulseMeshes.map((mesh: any, index: number) => (
          <primitive key={index} object={mesh} />
        ))}
      </group>

    </group>
  );
}