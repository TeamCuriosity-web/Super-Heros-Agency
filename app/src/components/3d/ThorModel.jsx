import React, { useLayoutEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

export function ThorModel(props) {
  const materials = useLoader(MTLLoader, 'models/thor/M-FF_iOS_HERO_Thor_Odinson_Avengers.mtl')
  const obj = useLoader(OBJLoader, 'models/thor/M-FF_iOS_HERO_Thor_Odinson_Avengers.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!obj) return

    obj.traverse((child) => {
      if (child.isMesh) {
        // Boost visibility
        child.material.emissiveIntensity = 0.1
        child.material.emissive = new THREE.Color(0xffffff)
        child.material.side = THREE.DoubleSide
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(obj)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -center.y, -center.z]
    })
  }, [obj])

  return (
    <group {...props}>
      <group position={[0, 1.2, 0]} scale={transform.scale}>
        <primitive object={obj} position={transform.offset} />
      </group>
    </group>
  )
}

