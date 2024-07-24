import { useMemo } from 'react';
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';

import vertexShaderSource from './shaders/vertexShader';
import fragmentShaderSource from './shaders/fragmentShader';

export default function usePulseMesh() {
  return useMemo(() => {
    const gridOut = { value: 0 }

    const generateSquares = () => {
      const pulseMeshes = [];
      const squareSize = 1
      const uTime = {value: 0}


      const positions: any = [[-5.5*squareSize, 1.5*squareSize, 0, [3, 3]], [1*squareSize, 0*squareSize, 0, [2, 2]], [6*squareSize, 2*squareSize, 0, [2, 2]]]

      for (let i of positions) {

        const startTime = Math.random() * 2
        const fadeInDuration = Math.random() * 7

        let direction = Math.random() >= 0.5 ? 1.0 : -1.0

          const geometry = new PlaneGeometry(i[3][0] * squareSize, i[3][1] * squareSize);
          const material = new ShaderMaterial({
            side: DoubleSide,
            transparent: true,
            vertexShader: vertexShaderSource,
            fragmentShader: fragmentShaderSource,
            uniforms: {
              radius: { value: 3},
              uTime,
              startTime: {value: startTime},
              fadeInDuration: {value: fadeInDuration},
              direction: {value: direction},
              gridOut
            },
          });


          const mesh = new Mesh(geometry, material);
          mesh.position.set(i[0], i[1], 0);

          pulseMeshes.push(mesh);
      }

      return {pulseMeshes, uTime};
    };

    const {pulseMeshes, uTime} = generateSquares();

  

    return { pulseMeshes, uTime, pulseOut: gridOut };
  }, [])
}