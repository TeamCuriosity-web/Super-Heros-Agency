import React, { useLayoutEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import * as THREE from 'three'

export function SupermanModel(props) {
  const result = useLoader(ColladaLoader, 'models/superman/20220201_034554.dae')
  const scene = result ? result.scene : null
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!scene) return

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -center.y, -center.z]
    })
  }, [scene])

  if (!scene) return null

  return (
    <group {...props}>
      <group position={[0, 1.2, 0]} scale={transform.scale}>
        <primitive object={scene} position={transform.offset} />
      </group>
    </group>
  )
}
