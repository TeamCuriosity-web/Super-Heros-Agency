import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function IronManModel(props) {
  const { scene } = useGLTF('models/ironman/scene.gltf')

  useLayoutEffect(() => {
    // Robust auto-scale and center logic
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 4 units to match Hulk exactly
    const targetHeight = 4
    const scaleFactor = targetHeight / size.y
    scene.scale.setScalar(scaleFactor)

    // Position normalization
    scene.position.x = -center.x * scaleFactor
    scene.position.y = -center.y * scaleFactor
    scene.position.z = -center.z * scaleFactor

  }, [scene])

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} position={[0, 0.5, 0]} />
    </group>
  )
}

useGLTF.preload('models/ironman/scene.gltf')

