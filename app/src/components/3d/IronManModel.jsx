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
    
    // Position normalization
    scene.position.x = -center.x
    scene.position.y = -center.y
    scene.position.z = -center.z

  }, [scene])

  return (
    <group {...props} dispose={null}>
      {/* Scale determined to fit the viewer for this specific model */}
      <primitive object={scene} scale={5} position={[0, 0.5, 0]} />
    </group>
  )
}

useGLTF.preload('models/ironman/scene.gltf')

