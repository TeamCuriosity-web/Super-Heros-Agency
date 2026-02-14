import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function HulkModel(props) {
  const { scene } = useGLTF('models/hulk/lego_hulk.glb')

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 4 units
    const targetHeight = 4
    const scaleFactor = targetHeight / size.y
    scene.scale.setScalar(scaleFactor)

    // Center the scaled model
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

useGLTF.preload('models/hulk/lego_hulk.glb')

