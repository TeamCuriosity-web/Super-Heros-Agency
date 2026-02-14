import React, { useLayoutEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

export function BatmanModel(props) {
  const materials = useLoader(MTLLoader, 'models/batman/Untitled Model.mtl')
  const obj = useLoader(OBJLoader, 'models/batman/Untitled Model.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!obj) return

    obj.traverse((child) => {
      if (child.isMesh) {
        // Boost visibility for dark suits
        child.material.emissiveIntensity = 0.05
        child.material.emissive = new THREE.Color(0xffffff)
        child.material.side = THREE.DoubleSide
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(obj)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
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

