import React, { useLayoutEffect, useState } from 'react'
import { useGLTF, Clone } from '@react-three/drei'
import * as THREE from 'three'

export function IronManModel(props) {
  const { scene } = useGLTF('models/ironman/scene.gltf')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!scene) return
    
    // Reset any previous modifications to the cached scene
    scene.position.set(0, 0, 0)
    scene.scale.set(1, 1, 1)
    scene.rotation.set(0, 0, 0)
    scene.updateMatrixWorld()

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -center.y, -center.z]
    })
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.2, 0]} scale={transform.scale}>
        <Clone object={scene} position={transform.offset} />
      </group>
    </group>
  )
}

useGLTF.preload('models/ironman/scene.gltf')

