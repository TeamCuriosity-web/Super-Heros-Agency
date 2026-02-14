import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function IronManModel(props) {
  const { scene } = useGLTF('models/ironman/scene.gltf')

  useLayoutEffect(() => {
    // Center the model geometry
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.x += (scene.position.x - center.x)
    scene.position.y += (scene.position.y - center.y)
    scene.position.z += (scene.position.z - center.z)
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={2.5} position={[0, 0.5, 0]} />
    </group>
  )
}

useGLTF.preload('models/ironman/scene.gltf')

