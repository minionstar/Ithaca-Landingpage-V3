import { useMemo } from 'react';
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';

import vertexShaderSource from './shaders/vertexShader';
import fragmentShaderSource from './shaders/fragmentShader';
import intermittentVertexShaderSource from './shaders/intermittentVertexShader';
import intermittentFragmentShaderSource from './shaders/intermittentFragmentShader';


export default function useGridMesh() {
  return useMemo(() => {
    const gridSize = 30;
    const squareSize = 1;
    const totalWidth = (gridSize - 1) * squareSize;
    const totalHeight = (gridSize - 1) * squareSize;
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;
    const gridOut = { value: 0 }
    const mouseX = {value: 0}
    const mouseY = {value: 0}
    const griduTime: any = {value: 0}


    // const coloredMeshes = [
    //   []
    // ]

    const generateSquares = () => {
      const meshes = [];
      const hoverMeshes: any = [[-8.5, 0.5], [-7.5, -0.5], [-6.5, 2.5], [-4.5, 3.5], [8.5, 0.5], [7.5, 3.5], [4.5, 2.5], [7.5, -0.5], [5.5, 0.5], [9.5, 4.5]];

      const geometry = new PlaneGeometry(1*squareSize, 1*squareSize);


      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const posX: any = startX + i * squareSize;
          const posY: any = startY + j * squareSize;

          const isColored = hoverMeshes.some(([x, y]: any) => x === posX && y === posY);


          let colorDetector

          if(isColored) {
            colorDetector = 1.9
          } else{
            colorDetector = 0.5
          }

          const rotation = Math.floor(Math.random() * 3.5) * Math.PI / 2
          


          const material = new ShaderMaterial({
            transparent: true,
            vertexShader: vertexShaderSource,
            fragmentShader: fragmentShaderSource,
            depthTest: true,
            depthWrite: true,
            uniforms: {
              colorDetector: { value: colorDetector },
              posX: { value: posX },
              posY: { value: posY },
              radius: { value: 5},
              isHovered: { value: 0.0},
              gridOut,
              mouseX: mouseX,
              mouseY: mouseY
            },
          });


          const {hoverMesh}: any = getIntermittentPulseMesh(posX  * squareSize, posY  * squareSize, gridOut, griduTime, colorDetector, rotation)
          const mesh = new Mesh(geometry, material);
          mesh.position.set(posX, posY, 0);
          mesh.userData.position = { x: posX, y: posY*-1 }

          const id = Math.random() + '_' + i + '_' + j;
          hoverMesh.rotation.z = rotation


          meshes.push([mesh, hoverMesh]);
        }
      }

      return {meshes, mouseX, mouseY};
    };

    const {meshes} = generateSquares();

    return { meshes, gridOut, mouseX, mouseY, griduTime};
  }, []);
}


function getIntermittentPulseMesh(posX: any, posY: any, gridOut: any, uTime: any, colorDetector: any, rotation: any) {

  const size = Math.random() > 0.5 ? 3 : 2

  let finalX = size === 2 ? posX - 0.5 : posX - 1
  let finalY = size === 2 ? posY - 0.5 : posY - 1

  const normalizedRotation = rotation * 2 / Math.PI

  if(normalizedRotation === 1) {
    finalX += size === 2 ? 1 : 2 
  } else if (normalizedRotation === 2) {
    finalX += size === 2 ? 1 : 2
    finalY += size === 2 ? 1 : 2
  } else if ( normalizedRotation === 3) {
    finalY += size === 2 ? 1 : 2 
  }

  const geometry = new PlaneGeometry(size*1, size*1);

  const material = new ShaderMaterial({
    transparent: true,
    vertexShader: intermittentVertexShaderSource,
    fragmentShader: intermittentFragmentShaderSource,
    depthTest: true,
    depthWrite: true,
    uniforms: {
      posX: { value: finalX },
      posY: { value: finalY },
      gridOut,
      rotation: {value: rotation},
      uTime,
      isHovered: {value: 3.0},
      colorDetector: {value: colorDetector}
    },
  });

  const hoverMesh = new Mesh(geometry, material);
  hoverMesh.position.set(finalX, finalY, 0);


  return {hoverMesh};
}