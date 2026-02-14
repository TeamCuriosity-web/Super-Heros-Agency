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
          color: '#4ade80', // bright green
          roughness: 0.4,
          metalness: 0.1,
          emissive: new THREE.Color('#14532d'), // dark green emissive
          emissiveIntensity: 0.2,
        })
        child.material.side = THREE.DoubleSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [obj])

  return (
    <group {...props} dispose={null}>
      {/* Initial scale/position - will need fine tuning */}
      <primitive object={obj} scale={0.003} position={[0, -1.0, 0]} />
    </group>
  )
}
