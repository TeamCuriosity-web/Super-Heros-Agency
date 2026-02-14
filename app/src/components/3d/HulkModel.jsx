import React, { useLayoutEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function HulkModel(props) {
  const { scene } = useGLTF('models/hulk/lego_hulk.glb')
  const groupRef = useRef()
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!scene) return
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
        <primitive object={scene} position={transform.offset} />
      </group>
    </group>
  )
}

useGLTF.preload('models/hulk/lego_hulk.glb')

