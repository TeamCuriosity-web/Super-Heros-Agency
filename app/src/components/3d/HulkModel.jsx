import React, { useLayoutEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import * as THREE from 'three'

export function HulkModel(props) {
  const obj = useLoader(OBJLoader, 'models/Hulk.obj')

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#22c55e', // Hulk green
          roughness: 0.8,
          metalness: 0.0,
        })
        child.castShadow = false // Disable shadows for 72MB model to fix lag
        child.receiveShadow = false
      }
    })
  }, [obj])

  return (
    <group {...props} dispose={null}>
      <primitive object={obj} scale={0.005} position={[0, -1.5, 0]} />
    </group>
  )
}
