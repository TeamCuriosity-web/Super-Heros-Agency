import React, { useLayoutEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

export function SpiderManModel(props) {
  const materials = useLoader(MTLLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate.mtl')

  const obj = useLoader(OBJLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!obj) return

    obj.traverse((child) => {
      if (child.isMesh) {
        // CRITICAL FIX: The MTL file has 'd 0.000' for weapon/accessories making them invisible
        child.material.transparent = false
        child.material.opacity = 1.0
        child.material.alphaTest = 0.5
        
        // Boost visibility for dark models
        child.material.emissiveIntensity = 0.15
        child.material.emissive = new THREE.Color(0xffffff)
        
        // Ensure double sided
        child.material.side = THREE.DoubleSide
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(obj)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units to match Iron Man/Hulk exactly
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
